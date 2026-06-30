// priority inbox - top N notifications based on type weight + recency

const notifications = [
  { id: 1, type: "placement", message: "TCS drive on Monday", timestamp: Date.now() - 2 * 60 * 1000 },
  { id: 2, type: "result", message: "Sem 5 results are out", timestamp: Date.now() - 10 * 60 * 1000 },
  { id: 3, type: "event", message: "Cultural fest this Friday", timestamp: Date.now() - 30 * 60 * 1000 },
  { id: 4, type: "placement", message: "Infosys registration open", timestamp: Date.now() - 5 * 60 * 1000 },
  { id: 5, type: "result", message: "Internal marks updated", timestamp: Date.now() - 60 * 60 * 1000 },
  { id: 6, type: "event", message: "Sports day tomorrow", timestamp: Date.now() - 45 * 60 * 1000 },
  { id: 7, type: "placement", message: "Wipro walkin next week", timestamp: Date.now() - 1 * 60 * 1000 },
  { id: 8, type: "result", message: "Revaluation results published", timestamp: Date.now() - 90 * 60 * 1000 },
  { id: 9, type: "event", message: "AI workshop today in seminar hall", timestamp: Date.now() - 20 * 60 * 1000 },
  { id: 10, type: "placement", message: "Accenture PPT tomorrow at 2pm", timestamp: Date.now() - 3 * 60 * 1000 },
  { id: 11, type: "result", message: "Project marks uploaded", timestamp: Date.now() - 75 * 60 * 1000 },
  { id: 12, type: "event", message: "Alumni meet next month", timestamp: Date.now() - 120 * 60 * 1000 },
];

const weight = {
  placement: 3,
  result: 2,
  event: 1,
};

function getTopN(list, n) {
  const timestamps = list.map(n => n.timestamp);
  const oldest = Math.min(...timestamps);
  const newest = Math.max(...timestamps);

  const withScores = list.map(item => {
    const typeScore = weight[item.type] || 0;
    const recency = (item.timestamp - oldest) / (newest - oldest);
    const finalScore = typeScore * 0.7 + recency * 0.3;
    return { ...item, score: finalScore };
  });

  withScores.sort((a, b) => b.score - a.score);
  return withScores.slice(0, n);
}

const top10 = getTopN(notifications, 10);

console.log("Top 10 Priority Notifications\n");
top10.forEach((item, i) => {
  console.log(`${i + 1}. [${item.type}] ${item.message} (score: ${item.score.toFixed(3)})`);
});
