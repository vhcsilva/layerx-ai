import styles from "./steps/steps.module.css";

export default function HackathonResult({
  result
}) {
  return(
    <div className={styles.resultContainer}>
      <div className={styles.resultSection}>
        <span>Overview</span>
        <p>{result.overview}</p>
      </div>

      <div className={styles.resultSection}>
        <span>Themes</span>
        <p>{result.themes}</p>
      </div>

      <div className={styles.resultSection}>
        <span>Deliverables</span>
        <p>{result.deliverables}</p>
      </div>

      <div className={styles.resultSection}>
        <span>Judging Criteria</span>
        <p>{result.judgingCriteria}</p>
      </div>

      <div className={styles.resultSection}>
        <span>Prizes</span>
        <p>{result.prizes}</p>
      </div>
    </div>
  );
}