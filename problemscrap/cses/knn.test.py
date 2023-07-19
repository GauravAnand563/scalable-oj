import numpy as np
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans

# Read scores from scores.txt
with open('scores.txt', 'r') as f:
    scores = [float(line.strip()) for line in f]

# Convert list to numpy array
X = np.array(scores).reshape(-1, 1)

# Plot histogram of scores
plt.hist(X, bins=20, color='gray')
plt.xlabel('Score')
plt.ylabel('Frequency')
plt.title('Histogram of Scores')
plt.show()


# Cluster data into 3 classes using KMeans
kmeans = KMeans(n_clusters=3, random_state=0).fit(X)

# Plot data points with different colors for each class
plt.scatter(X[kmeans.labels_ == 0], np.zeros_like(
    X[kmeans.labels_ == 0]), color='red')
plt.scatter(X[kmeans.labels_ == 1], np.zeros_like(
    X[kmeans.labels_ == 1]), color='blue')
plt.scatter(X[kmeans.labels_ == 2], np.zeros_like(
    X[kmeans.labels_ == 2]), color='green')
plt.show()

# Identify threshold values
threshold1 = np.min(X[kmeans.labels_ == 0])
threshold2 = np.min(X[kmeans.labels_ == 2])

# Print threshold values
print('Threshold 1:', threshold1)
print('Threshold 2:', threshold2)
