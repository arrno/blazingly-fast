"use client";

import { useMemo, useRef, useEffect } from "react";
import ReactFlow, {
    Node,
    Edge,
    useNodesState,
    useEdgesState,
    MarkerType,
    Position,
    ReactFlowInstance,
} from "reactflow";
import "reactflow/dist/style.css";

const nodeTypes = {};

export default function ParallelFlowPreview() {
    const containerRef = useRef<HTMLDivElement>(null);
    const reactFlowRef = useRef<ReactFlowInstance | null>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleWheel = (e: WheelEvent) => {
            e.stopPropagation();
            e.preventDefault();

            // Faster, more responsive scrolling
            const scrollMultiplier = 1.5; // Increase scroll speed
            window.scrollBy({
                top: e.deltaY * scrollMultiplier,
                left: e.deltaX * scrollMultiplier,
                behavior: "instant", // Use instant for immediate response
            });
        };

        // Add passive: false to ensure we can prevent default
        container.addEventListener("wheel", handleWheel, { passive: false });

        // ResizeObserver to re-center the chart when container size changes
        const resizeObserver = new ResizeObserver(() => {
            if (reactFlowRef.current) {
                // Small delay to ensure the resize is complete
                setTimeout(() => {
                    reactFlowRef.current?.fitView({ padding: 0.1 });
                }, 100);
            }
        });
        resizeObserver.observe(container);

        return () => {
            container.removeEventListener("wheel", handleWheel);
            resizeObserver.disconnect();
        };
    }, []);

    const initialNodes: Node[] = useMemo(
        () => [
            {
                id: "input",
                type: "input",
                position: { x: 250, y: 0 },
                data: {
                    label: (
                        <div
                            className="flex items-center gap-1 bg-gray-900/90 backdrop-blur-sm rounded-md border border-gray-700/50 px-1 py-2 shadow-sm"
                            style={{ width: "6rem", minWidth: "6rem" }}
                        >
                            <div className="w-7 h-7 bg-gray-700/50 rounded flex items-center justify-center flex-shrink-0">
                                <svg
                                    className="w-5 h-5 text-gray-300"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M12 4v16m8-8H4"
                                    />
                                </svg>
                            </div>
                            <span className="text-base text-gray-200 font-medium whitespace-nowrap">
                                Input
                            </span>
                        </div>
                    ),
                },
                style: {
                    background: "transparent",
                    border: "none",
                    padding: 0,
                    width: "6rem",
                    minWidth: "6rem",
                },
                sourcePosition: Position.Bottom,
            },
            {
                id: "validate",
                position: { x: 100, y: 120 },
                data: {
                    label: (
                        <div
                            className="flex items-center gap-1 bg-gray-900/90 backdrop-blur-sm rounded-md border border-gray-700/50 px-1 py-2 shadow-sm"
                            style={{ width: "6rem", minWidth: "6rem" }}
                        >
                            <div className="w-7 h-7 bg-green-500/20 rounded flex items-center justify-center flex-shrink-0 animate-pulse">
                                <svg
                                    className="w-5 h-5 text-green-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <span className="text-base text-gray-200 font-medium whitespace-nowrap">
                                Validate
                            </span>
                        </div>
                    ),
                },
                style: {
                    background: "transparent",
                    border: "none",
                    padding: 0,
                    width: "6rem",
                    minWidth: "6rem",
                },
                targetPosition: Position.Top,
                sourcePosition: Position.Bottom,
            },
            {
                id: "transform",
                position: { x: 250, y: 120 },
                data: {
                    label: (
                        <div
                            className="flex items-center gap-1 bg-gray-900/90 backdrop-blur-sm rounded-md border border-gray-700/50 px-1 py-2 shadow-sm"
                            style={{ width: "6rem", minWidth: "6rem" }}
                        >
                            <div className="w-7 h-7 bg-blue-500/20 rounded flex items-center justify-center flex-shrink-0 animate-pulse">
                                <svg
                                    className="w-5 h-5 text-blue-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                    />
                                </svg>
                            </div>
                            <span className="text-base text-gray-200 font-medium whitespace-nowrap">
                                Transform
                            </span>
                        </div>
                    ),
                },
                style: {
                    background: "transparent",
                    border: "none",
                    padding: 0,
                    width: "6rem",
                    minWidth: "6rem",
                },
                targetPosition: Position.Top,
                sourcePosition: Position.Bottom,
            },
            {
                id: "enrich",
                position: { x: 400, y: 120 },
                data: {
                    label: (
                        <div
                            className="flex items-center gap-1 bg-gray-900/90 backdrop-blur-sm rounded-md border border-gray-700/50 px-1 py-2 shadow-sm"
                            style={{ width: "6rem", minWidth: "6rem" }}
                        >
                            <div className="w-7 h-7 bg-purple-500/20 rounded flex items-center justify-center flex-shrink-0 animate-pulse">
                                <svg
                                    className="w-5 h-5 text-purple-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M13 10V3L4 14h7v7l9-11h-7z"
                                    />
                                </svg>
                            </div>
                            <span className="text-base text-gray-200 font-medium whitespace-nowrap">
                                Enrich
                            </span>
                        </div>
                    ),
                },
                style: {
                    background: "transparent",
                    border: "none",
                    padding: 0,
                    width: "6rem",
                    minWidth: "6rem",
                },
                targetPosition: Position.Top,
                sourcePosition: Position.Bottom,
            },
            {
                id: "throttle1",
                position: { x: 175, y: 240 },
                data: {
                    label: (
                        <div
                            className="flex items-center gap-1 bg-gray-900/90 backdrop-blur-sm rounded-md border border-gray-700/50 px-1 py-2 shadow-sm"
                            style={{ width: "6rem", minWidth: "6rem" }}
                        >
                            <div className="w-7 h-7 bg-yellow-500/20 rounded flex items-center justify-center flex-shrink-0">
                                <svg
                                    className="w-5 h-5 text-yellow-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <span className="text-base text-gray-200 font-medium whitespace-nowrap">
                                Throttle
                            </span>
                        </div>
                    ),
                },
                style: {
                    background: "transparent",
                    border: "none",
                    padding: 0,
                    width: "6rem",
                    minWidth: "6rem",
                },
                targetPosition: Position.Top,
                sourcePosition: Position.Bottom,
            },
            {
                id: "throttle2",
                position: { x: 325, y: 240 },
                data: {
                    label: (
                        <div
                            className="flex items-center gap-1 bg-gray-900/90 backdrop-blur-sm rounded-md border border-gray-700/50 px-1 py-2 shadow-sm"
                            style={{ width: "6rem", minWidth: "6rem" }}
                        >
                            <div className="w-7 h-7 bg-yellow-500/20 rounded flex items-center justify-center flex-shrink-0">
                                <svg
                                    className="w-5 h-5 text-yellow-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <span className="text-base text-gray-200 font-medium whitespace-nowrap">
                                Throttle
                            </span>
                        </div>
                    ),
                },
                style: {
                    background: "transparent",
                    border: "none",
                    padding: 0,
                    width: "6rem",
                    minWidth: "6rem",
                },
                targetPosition: Position.Top,
                sourcePosition: Position.Bottom,
            },
            {
                id: "output",
                type: "output",
                position: { x: 250, y: 360 },
                data: {
                    label: (
                        <div
                            className="flex items-center gap-1 bg-gray-900/90 backdrop-blur-sm rounded-md border border-gray-700/50 px-1 py-2 shadow-sm"
                            style={{ width: "6rem", minWidth: "6rem" }}
                        >
                            <div className="w-7 h-7 bg-gray-700/50 rounded flex items-center justify-center flex-shrink-0">
                                <svg
                                    className="w-5 h-5 text-gray-300"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M5 12h14M12 5l7 7-7 7"
                                    />
                                </svg>
                            </div>
                            <span className="text-base text-gray-200 font-medium whitespace-nowrap">
                                Output
                            </span>
                        </div>
                    ),
                },
                style: {
                    background: "transparent",
                    border: "none",
                    padding: 0,
                    width: "6rem",
                    minWidth: "6rem",
                },
                targetPosition: Position.Top,
            },
        ],
        []
    );

    const initialEdges: Edge[] = useMemo(
        () => [
            {
                id: "input-validate",
                source: "input",
                target: "validate",
                type: "default",
                style: { stroke: "#6b7280", strokeWidth: 1 },
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    width: 16,
                    height: 16,
                    color: "#6b7280",
                },
            },
            {
                id: "input-transform",
                source: "input",
                target: "transform",
                type: "default",
                style: { stroke: "#6b7280", strokeWidth: 1 },
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    width: 16,
                    height: 16,
                    color: "#6b7280",
                },
            },
            {
                id: "input-enrich",
                source: "input",
                target: "enrich",
                type: "default",
                style: { stroke: "#6b7280", strokeWidth: 1 },
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    width: 16,
                    height: 16,
                    color: "#6b7280",
                },
            },
            {
                id: "validate-throttle1",
                source: "validate",
                target: "throttle1",
                type: "default",
                style: { stroke: "#6b7280", strokeWidth: 1 },
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    width: 16,
                    height: 16,
                    color: "#6b7280",
                },
            },
            {
                id: "transform-throttle1",
                source: "transform",
                target: "throttle1",
                type: "default",
                style: { stroke: "#6b7280", strokeWidth: 1 },
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    width: 16,
                    height: 16,
                    color: "#6b7280",
                },
            },
            {
                id: "enrich-throttle2",
                source: "enrich",
                target: "throttle2",
                type: "default",
                style: { stroke: "#6b7280", strokeWidth: 1 },
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    width: 16,
                    height: 16,
                    color: "#6b7280",
                },
            },
            {
                id: "throttle1-output",
                source: "throttle1",
                target: "output",
                type: "default",
                style: { stroke: "#6b7280", strokeWidth: 1 },
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    width: 16,
                    height: 16,
                    color: "#6b7280",
                },
            },
            {
                id: "throttle2-output",
                source: "throttle2",
                target: "output",
                type: "default",
                style: { stroke: "#6b7280", strokeWidth: 1 },
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    width: 16,
                    height: 16,
                    color: "#6b7280",
                },
            },
        ],
        []
    );

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    return (
        <div
            ref={containerRef}
            className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-lg border border-gray-700/50 shadow-sm"
            style={{ height: "400px" }}
        >
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                fitView
                className="bg-transparent"
                nodesDraggable={false}
                nodesConnectable={false}
                elementsSelectable={false}
                zoomOnScroll={false}
                panOnScroll={false}
                zoomOnPinch={false}
                panOnDrag={false}
                zoomOnDoubleClick={false}
                preventScrolling={true}
                onInit={(instance) => {
                    reactFlowRef.current = instance;
                }}
            />
            <style jsx global>{`
                .react-flow__attribution {
                    display: none !important;
                }
            `}</style>
        </div>
    );
}
