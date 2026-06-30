
A priority inbox that shows the top 10 most important unread notifications first.

Priority is decided by two things:
- **Type** — placement is more urgent than result, result more than event
- **Recency** — newer notifications rank higher if type weight is same


Each notification gets a score:
score = typeWeight * 0.7 + recencyScore * 0.3
Type weights:
- placement = 3
- result = 2
- event = 1

Recency is normalized between 0 and 1 based on the oldest and newest notification in the list.

I weighted type at 70% because a placement notice from 2 hours ago should still beat a recent event notice. But recency still matters so older stuff doesn't permanently stay on top.

Right now the list is in memory. When a new notification comes in, it gets added to the array and the scoring runs again. Since we're just sorting an array it's fast enough for small sets.

For larger scale — a min-heap of size N would be better. Each new notification gets scored and compared against the smallest score in the heap. If it's higher, it replaces it. That way we never re-sort the whole list, just do O(log N) per insert.

To run the file

node priority_inbox.js

Output shows top 10 notifications ranked by priority score.
