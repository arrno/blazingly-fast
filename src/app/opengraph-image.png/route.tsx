import { ImageResponse } from "next/og";

export const runtime = "edge";

export function GET() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "1200px",
                    height: "630px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "32px",
                    background:
                        "linear-gradient(160deg, #05070a 0%, #0b1016 55%, #020305 100%)",
                    color: "#F8FAFC",
                    fontFamily:
                        '"DejaVu Sans", "Verdana", "Segoe UI", sans-serif',
                    letterSpacing: "0.02em",
                }}
            >
                <div
                    style={{
                        fontSize: 68,
                        fontWeight: 700,
                        textTransform: "lowercase",
                        display: "flex",
                        alignItems: "center",
                        gap: 18,
                    }}
                >
                    <span style={{ color: "#F8FAFC" }}>🔥 blazingly.fast</span>
                </div>

                <div
                    style={{
                        fontSize: 32,
                        color: "#E2E8F0",
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                    }}
                >
                    The world’s most rigorous self-certification program
                </div>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "36px 72px",
                        borderRadius: "24px",
                        background:
                            "linear-gradient(155deg, rgba(36,42,52,0.92), rgba(18,22,29,0.88))",
                        boxShadow: "0 26px 48px rgba(0, 0, 0, 0.55)",
                        border: "1px solid rgba(255, 255, 255, 0.06)",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            fontSize: 40,
                            fontWeight: 600,
                            color: "#F8FAFC",
                            borderRadius: "16px",
                            overflow: "hidden",
                            boxShadow: "0 16px 32px rgba(11,17,25,0.45)",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                padding: "22px 24px",
                                background:
                                    "linear-gradient(180deg, #505862 0%, #2D3338 100%)",
                                borderTopLeftRadius: "16px",
                                borderBottomLeftRadius: "16px",
                                letterSpacing: "0.06em",
                                textTransform: "lowercase",
                                position: "relative",
                            }}
                        >
                            <span
                                style={{
                                    textShadow: "0 2px 4px rgba(0,0,0,0.35)",
                                }}
                            >
                                VIBES
                            </span>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                padding: "22px 24px",
                                background:
                                    "linear-gradient(180deg, #FF7F7F 0%, #FF5C5C 100%)",
                                borderTopRightRadius: "16px",
                                borderBottomRightRadius: "16px",
                                letterSpacing: "0.06em",
                                textTransform: "lowercase",
                                position: "relative",
                            }}
                        >
                            <span
                                style={{
                                    textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                                }}
                            >
                                OPTIMISM
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    );
}
