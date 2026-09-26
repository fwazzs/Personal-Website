import styles from "./ProjectMedia.module.css";
import type { ProjectMedia as ProjectMediaKind } from "@/data/content";

interface ProjectMediaProps {
  media: ProjectMediaKind;
}

interface Bar {
  x: number;
  y: number;
  height: number;
  delay: string;
  highlight?: boolean;
}

const bars: Bar[] = [
  { x: 8, y: 100, height: 69, delay: "-2.6s" },
  { x: 46, y: 70, height: 99, delay: "-1.9s" },
  { x: 84, y: 112, height: 57, delay: "-1.1s" },
  { x: 122, y: 48, height: 121, delay: "-0.4s" },
  { x: 160, y: 86, height: 83, delay: "-2.2s" },
  { x: 198, y: 30, height: 139, delay: "-0.9s", highlight: true },
  { x: 236, y: 64, height: 105, delay: "-1.5s" },
  { x: 274, y: 94, height: 75, delay: "-0.1s" },
];

function House() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[length:20px_20px] [perspective:700px] lg:bg-[length:24px_24px] lg:[perspective:900px]">
      <div className="scale-[0.7] [transform-style:preserve-3d] lg:scale-[1.15]">
        <div className={styles.house}>
          <div className={`${styles.wall} ${styles.wallFront}`}>
            <span className={styles.door} />
            <span className={`${styles.window} ${styles.windowFrontLeft}`} />
            <span className={`${styles.window} ${styles.windowFrontRight}`} />
          </div>
          <div className={`${styles.wall} ${styles.wallBack}`}>
            <span className={`${styles.window} ${styles.windowBackLeft}`} />
            <span className={`${styles.window} ${styles.windowBackRight}`} />
          </div>
          <div className={`${styles.wall} ${styles.wallSide} ${styles.wallLeft}`}>
            <span className={`${styles.window} ${styles.windowSide}`} />
          </div>
          <div className={`${styles.wall} ${styles.wallSide} ${styles.wallRight}`}>
            <span className={`${styles.window} ${styles.windowSide}`} />
          </div>
          <div className={`${styles.gable} ${styles.gableFront}`}>
            <svg width="200" height="70" viewBox="0 0 200 70" fill="rgba(20,20,22,0.55)">
              <path d="M0 70 L100 0 L200 70" stroke="rgba(255,255,255,0.45)" />
            </svg>
          </div>
          <div className={`${styles.gable} ${styles.gableBack}`}>
            <svg width="200" height="70" viewBox="0 0 200 70" fill="rgba(20,20,22,0.55)">
              <path d="M0 70 L100 0 L200 70" stroke="rgba(255,255,255,0.45)" />
            </svg>
          </div>
          <div className={`${styles.roof} ${styles.roofLeft}`} />
          <div className={`${styles.roof} ${styles.roofRight}`} />
          <div className={styles.chimney} />
          <div className={styles.base} />
        </div>
      </div>
    </div>
  );
}

function Wave() {
  return (
    <svg viewBox="0 0 320 180" className="h-auto w-[220px] lg:w-[320px]" fill="none">
      <path d="M0 90h320M160 0v180" className="stroke-line-chip" />
      <path d="M0 45h320M0 135h320M80 0v180M240 0v180" className="stroke-line" />
      <path
        className={`${styles.chartPath} stroke-fg`}
        d="M0 90C40 10 70 10 110 90S180 170 220 90 290 10 320 60"
        strokeWidth="1.75"
      />
      <circle className="animate-pulse-soft fill-fg" cx="110" cy="90" r="4" />
    </svg>
  );
}

function Bars() {
  return (
    <svg viewBox="0 0 300 170" className="h-auto w-[220px] lg:w-[300px]" fill="none">
      <path d="M0 169h300" className="stroke-line-chip" />
      {bars.map((bar) => (
        <rect
          key={bar.x}
          className={`${styles.bar} ${bar.highlight ? "fill-fg" : "fill-line-card-hover"}`}
          style={{ animationDelay: bar.delay }}
          x={bar.x}
          y={bar.y}
          width={22}
          height={bar.height}
          rx={5}
        />
      ))}
    </svg>
  );
}

export default function ProjectMedia({ media }: ProjectMediaProps) {
  return (
    <div aria-hidden="true" className="flex h-full w-full items-center justify-center bg-surface-sunken">
      {media === "house" && <House />}
      {media === "wave" && <Wave />}
      {media === "bars" && <Bars />}
    </div>
  );
}
