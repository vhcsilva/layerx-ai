import styles from "./steps/steps.module.css";

export default function BountyResult({
  result
}) {
  return(
    <div className={styles.resultContainer}>
      <div className={styles.resultSection}>
        <span>Title</span>
        <p>{result.title}</p>
      </div>

      <div className={styles.resultSection}>
        <span>Description</span>
        <p>{result.description}</p>
      </div>

      <div className={styles.resultSection}>
        <span>Programming Languages</span>
        <p>{result.programmingLanguages.join(", ")}</p>
      </div>

      <div className={styles.resultSection}>
        <span>Reward amount</span>
        <p>{result.rewardAmount}</p>
      </div>
    </div>
  );
}