export default function Loading() {
  return (
    <div style={styles.container}>
      <div style={styles.dot}></div>
      <div style={{ ...styles.dot, animationDelay: "0.2s" }}></div>
      <div style={{ ...styles.dot, animationDelay: "0.4s" }}></div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    gap: "8px",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  dot: {
    width: "12px",
    height: "12px",
    backgroundColor: "#3b82f6",
    borderRadius: "50%",
    animation: "bounce 0.6s infinite ease-in-out",
  },
};