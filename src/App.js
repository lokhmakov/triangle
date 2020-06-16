import React from "react";
import { useSpring, animated } from "react-spring";
import "./styles.css";

const defaults = {
  a3: { x: 15, y: 50, text: "COST", offsetX: -8, offsetY: 9 },
  a1: { x: 45, y: 10, text: "TIME", offsetX: -8, offsetY: -5 },
  a2: { x: 75, y: 50, text: "QUALITY", offsetX: -13, offsetY: 9 }
};

function Key({ x, y, lineTo, offsetX, offsetY, text, onFinish }) {
  const sText = useSpring({
    from: { opacity: 0 },
    to: [{ opacity: 1 }]
  });

  const sLine = useSpring({
    from: { x, y },
    to: { x: lineTo.x, y: lineTo.y },
    onRest: onFinish
  });

  return (
    <>
      <circle cx={x} cy={y} r="2" />
      <animated.text
        x={x + offsetX}
        y={y + offsetY}
        className="text"
        style={{ opacity: sText.opacity }}
      >
        {text}
      </animated.text>
      <animated.line x1={x} y1={y} x2={sLine.x} y2={sLine.y} stroke="black" />
    </>
  );
}

export default function App() {
  const { a1, a2, a3 } = defaults;

  const [value, setValue] = React.useState(0);

  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <Key
        {...a1}
        lineTo={a2}
        onFinish={() => setValue(() => (value === 0 ? 1 : value))}
      />
      {value > 0 ? (
        <Key
          {...a2}
          lineTo={defaults.a3}
          onFinish={() => setValue(() => (value === 1 ? 2 : value))}
        />
      ) : null}
      {value > 1 ? <Key {...a3} lineTo={defaults.a1} /> : null}
    </svg>
  );
}
