/*
	Installed from https://reactbits.dev/ts/default/
*/

import React, { useRef, useEffect, ReactNode } from "react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import "./InfiniteScroll.css";

gsap.registerPlugin(Observer);

interface InfiniteScrollItem {
  content: ReactNode;
}

interface InfiniteScrollProps {
  width?: string;
  maxHeight?: string;
  negativeMargin?: string;
  items?: InfiniteScrollItem[];
  itemMinHeight?: number;
  itemMinWidth?: number; // New prop for horizontal scrolling
  isTilted?: boolean;
  tiltDirection?: "left" | "right" | "up" | "down"; // Updated tilt directions
  autoplay?: boolean;
  autoplaySpeed?: number;
  autoplayDirection?: "down" | "up" | "left" | "right"; // Updated autoplay directions
  pauseOnHover?: boolean;
  scrollDirection?: "vertical" | "horizontal"; // New prop for scroll direction
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  width = "30rem",
  maxHeight = "100%",
  negativeMargin = "-0.5em",
  items = [],
  itemMinHeight = 150,
  itemMinWidth = 250, // Default for horizontal
  isTilted = false,
  tiltDirection = "left",
  autoplay = false,
  autoplaySpeed = 0.5,
  autoplayDirection = "down",
  pauseOnHover = false,
  scrollDirection = "vertical", // Default to vertical
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const getTiltTransform = (): string => {
    if (!isTilted) return "none";
    if (scrollDirection === "vertical") {
      return tiltDirection === "left"
        ? "rotateX(20deg) rotateZ(-20deg) skewX(20deg)"
        : "rotateX(20deg) rotateZ(20deg) skewX(-20deg)";
    } else { // Horizontal
      return tiltDirection === "up"
        ? "rotateY(20deg) rotateZ(-20deg) skewY(20deg)" // Adjusted for horizontal
        : "rotateY(-20deg) rotateZ(20deg) skewY(-20deg)"; // Adjusted for horizontal
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (items.length === 0) return;

    const divItems = gsap.utils.toArray<HTMLDivElement>(container.children);
    if (!divItems.length) return;

    const firstItem = divItems[0];
    const itemStyle = getComputedStyle(firstItem);

    const isHorizontal = scrollDirection === "horizontal";
    const sizeProperty = isHorizontal ? "offsetWidth" : "offsetHeight";
    const marginProperty = isHorizontal ? "marginLeft" : "marginTop";
    const positionProperty = isHorizontal ? "x" : "y";
    const deltaProperty = isHorizontal ? "deltaX" : "deltaY";

    const itemSize = firstItem[sizeProperty];
    const itemMargin = parseFloat(itemStyle[marginProperty as any]) || 0;
    const totalItemSize = itemSize + itemMargin;
    const totalContentSize =
      itemSize * items.length + itemMargin * (items.length - 1);

    const wrapFn = gsap.utils.wrap(-totalContentSize, totalContentSize);

    divItems.forEach((child, i) => {
      const pos = i * totalItemSize;
      gsap.set(child, { [positionProperty]: pos });
    });

    const observer = Observer.create({
      target: container,
      type: "touch,pointer", // Removed 'wheel' from the type
      onPress: ({ target }) => {
        (target as HTMLElement).style.cursor = "grabbing";
      },
      onRelease: ({ target }) => {
        (target as HTMLElement).style.cursor = "grab";
      },
      onChange: ({ [deltaProperty]: delta, isDragging, event }) => {
        // Use destructuring for deltaProperty
        const d = event.type === "wheel" ? -delta : delta;
        const distance = isDragging ? d * 5 : d * 10;
        divItems.forEach((child) => {
          gsap.to(child, {
            duration: 0.5,
            ease: "expo.out",
            [positionProperty]: `+=${distance}`, // Use computed property name
            modifiers: {
              [positionProperty]: gsap.utils.unitize(wrapFn), // Use computed property name
            },
          });
        });
      },
    });

    let animation: gsap.core.Tween;
    if (autoplay) {
      let directionFactor = 1;
      if (autoplayDirection === "up" || autoplayDirection === "left") {
        directionFactor = -1;
      }

      animation = gsap.to(divItems, {
        [positionProperty]: `+=${totalContentSize * directionFactor}`, // Use computed property name
        ease: "none",
        repeat: -1,
        duration: (items.length * 2) / autoplaySpeed,
        modifiers: {
          [positionProperty]: (pos) => wrapFn(parseFloat(pos)) + "px", // Use computed property name
        },
      });

      if (pauseOnHover) {
        // Changed to timeScale for more reliable pause/resume
        const pauseAnimation = () => animation.timeScale(0);
        const resumeAnimation = () => animation.timeScale(1);

        divItems.forEach((child) => {
          child.addEventListener("mouseenter", pauseAnimation);
          child.addEventListener("mouseleave", resumeAnimation);
        });

        return () => {
          observer.kill();
          if (animation) {
            animation.kill();
          }
          divItems.forEach((child) => {
            child.removeEventListener("mouseenter", pauseAnimation);
            child.removeEventListener("mouseleave", resumeAnimation);
          });
        };
      }
    }

    return () => {
      observer.kill();
      if (animation) {
        animation.kill();
      }
    };
  }, [
    items,
    autoplay,
    autoplaySpeed,
    autoplayDirection,
    pauseOnHover,
    isTilted,
    tiltDirection,
    negativeMargin,
    itemMinHeight,
    itemMinWidth,
    scrollDirection, // Add scrollDirection to dependencies
  ]);

  return (
    <>
      <style>
        {`
          .infinite-scroll-wrapper {
            max-${scrollDirection === "horizontal" ? "width" : "height"}: ${
          scrollDirection === "horizontal" ? width : maxHeight
        };
            ${
              scrollDirection === "horizontal"
                ? "height: 100%; overflow-x: hidden; overflow-y: hidden;" 
                : "width: 100%; overflow-y: scroll; overflow-x: hidden;"
            }
          }
  
          .infinite-scroll-container {
            display: flex;
            flex-direction: ${scrollDirection === "horizontal" ? "row" : "column"};
            ${scrollDirection === "horizontal" ? "height: 100%;" : "width: 100%;"}
          }
  
          .infinite-scroll-item {
            min-${scrollDirection === "horizontal" ? "width" : "height"}: ${
          scrollDirection === "horizontal" ? itemMinWidth : itemMinHeight
        }px;
          }
        `}
      </style>
      <div className="infinite-scroll-wrapper" ref={wrapperRef}>
        <div
          className="infinite-scroll-container"
          ref={containerRef}
          style={{
            transform: getTiltTransform(),
          }}
        >
          {items.map((item, i) => (
            <div className="infinite-scroll-item" key={i}>
              {item.content}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default InfiniteScroll;
