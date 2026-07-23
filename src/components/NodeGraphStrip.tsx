"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface NodeData {
  id: string;
  name: string;
  type: "trigger" | "action" | "ai" | "output";
  x: number;
  y: number;
}

export default function NodeGraphStrip() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pulseRefs = useRef<SVGCircleElement[]>([]);

  const nodes: NodeData[] = [
    { id: "1", name: "Inbound Hook", type: "trigger", x: 60, y: 70 },
    { id: "2", name: "Clay Scraper", type: "action", x: 260, y: 70 },
    { id: "3", name: "OpenAI Score", type: "ai", x: 460, y: 150 },
    { id: "4", name: "Lead Qualified?", type: "trigger", x: 660, y: 70 },
    { id: "5", name: "HubSpot CRM", type: "output", x: 860, y: 70 },
    { id: "6", name: "Slack Alert", type: "output", x: 860, y: 220 },
  ];

  const getPath = (n1: NodeData, n2: NodeData) => {
    const dx = n2.x - n1.x;
    return `M ${n1.x} ${n1.y} C ${n1.x + dx * 0.5} ${n1.y}, ${n2.x - dx * 0.5} ${n2.y}, ${n2.x} ${n2.y}`;
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isMounted = true;
    const timeouts: NodeJS.Timeout[] = [];
    const pulses = pulseRefs.current;
    if (!pulses || pulses.length === 0) return;

    pulses.forEach((pulse, idx) => {
      if (!pulse) return;
      const pathId = `path-${idx}`;
      const pathElement = container.querySelector(`#${pathId}`) as SVGPathElement;
      if (!pathElement) return;

      let pathLength = 0;
      try {
        pathLength = pathElement.getTotalLength();
      } catch (e) {
        return;
      }

      gsap.set(pulse, { opacity: 0 });

      const runPulse = () => {
        if (!isMounted) return;
        const valObj = { progress: 0 };
        gsap.to(valObj, {
          progress: 1,
          duration: 3,
          ease: "power1.inOut",
          delay: idx * 1.2,
          onStart: () => {
            if (isMounted) gsap.set(pulse, { opacity: 1 });
          },
          onUpdate: () => {
            if (!isMounted) return;
            try {
              const point = pathElement.getPointAtLength(valObj.progress * pathLength);
              gsap.set(pulse, { attr: { cx: point.x, cy: point.y } });
            } catch (e) {
              // Safe catch if SVG element is detached
            }
          },
          onComplete: () => {
            if (!isMounted) return;
            gsap.set(pulse, { opacity: 0 });
            const targetNodeId = pathElement.getAttribute("data-target");
            const targetNode = container.querySelector(`#node-${targetNodeId}`);
            if (targetNode && isMounted) {
              gsap.fromTo(
                targetNode,
                { stroke: "rgba(110, 231, 201, 0.8)", strokeWidth: 2 },
                { stroke: "rgba(244, 239, 230, 0.09)", strokeWidth: 1, duration: 0.8 }
              );
            }
            if (isMounted) {
              const t = setTimeout(runPulse, 500);
              timeouts.push(t);
            }
          },
        });
      };

      runPulse();
    });

    return () => {
      isMounted = false;
      timeouts.forEach(clearTimeout);
      if (container) {
        gsap.killTweensOf(container.querySelectorAll("*"));
      }
    };
  }, []);

  const getNodeColor = (type: string) => {
    switch (type) {
      case "trigger":
        return "bg-mint/10 border-mint/30 text-mint";
      case "ai":
        return "bg-violet/10 border-violet/30 text-violet";
      case "action":
        return "bg-coral/10 border-coral/30 text-coral";
      default:
        return "bg-surface-2 border-border text-text-muted";
    }
  };

  return (
    <div
      ref={containerRef}
      className="w-full overflow-x-auto overflow-y-hidden py-10 px-4 scrollbar-hide select-none"
    >
      <div className="relative min-w-[960px] h-[280px] mx-auto">
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <path
            id="path-0"
            data-target="2"
            d={getPath(nodes[0], nodes[1])}
            fill="none"
            stroke="rgba(244, 239, 230, 0.08)"
            strokeWidth="2"
            strokeDasharray="4 6"
          />
          <path
            id="path-1"
            data-target="3"
            d={getPath(nodes[1], nodes[2])}
            fill="none"
            stroke="rgba(244, 239, 230, 0.08)"
            strokeWidth="2"
            strokeDasharray="4 6"
          />
          <path
            id="path-2"
            data-target="4"
            d={getPath(nodes[2], nodes[3])}
            fill="none"
            stroke="rgba(244, 239, 230, 0.08)"
            strokeWidth="2"
            strokeDasharray="4 6"
          />
          <path
            id="path-3"
            data-target="5"
            d={getPath(nodes[3], nodes[4])}
            fill="none"
            stroke="rgba(244, 239, 230, 0.08)"
            strokeWidth="2"
            strokeDasharray="4 6"
          />
          <path
            id="path-4"
            data-target="6"
            d={getPath(nodes[3], nodes[5])}
            fill="none"
            stroke="rgba(244, 239, 230, 0.08)"
            strokeWidth="2"
            strokeDasharray="4 6"
          />

          {[0, 1, 2, 3, 4].map((idx) => (
            <circle
              key={idx}
              ref={(el) => {
                if (el) pulseRefs.current[idx] = el;
              }}
              r="5"
              fill={idx % 2 === 0 ? "#00F5B8" : "#FF3B5C"}
              className="filter drop-shadow-[0_0_6px_rgba(0,245,184,0.8)]"
            />
          ))}
        </svg>

        {nodes.map((node) => (
          <div
            key={node.id}
            id={`node-${node.id}`}
            style={{
              left: `${node.x - 75}px`,
              top: `${node.y - 35}px`,
            }}
            className={`absolute w-[150px] h-[70px] rounded-2xl border p-3 flex flex-col justify-between transition-all duration-300 bg-surface/90 backdrop-blur-sm shadow-lg ${getNodeColor(
              node.type
            )}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-wider font-semibold opacity-75">
                {node.type}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            </div>
            <span className="font-sans font-semibold text-[13px] text-text">
              {node.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
