import "./TodoSkeleton.css";

interface TodoSkeletonProps {
  numberOfCard: number;
}

function TodoSkeleton({ numberOfCard }: TodoSkeletonProps) {
  return (
    <div className="container">
      <div className="main-section skeleton-section">
        <div className="skeleton-header skeleton-content"></div>
        <div className="skeleton-input-section">
          <div className="skeleton-input skeleton-content"></div>
          <div className="skeleton-add-button skeleton-content"></div>
        </div>
        <div className="tasks-header">
          <div className="skeleton-add-button skeleton-content"></div>
          <div className="skeleton-add-button skeleton-content"></div>
        </div>
        <div className="task-list">
          {Array(numberOfCard)
            .fill(1)
            .map((_, index) => (
              <div className="skeleton-card" key={index}>
                <div className="skeleton-checkbox skeleton-content"></div>
                <div className="skeleton-text skeleton-content"></div>
                <div className="skeleton-action-button skeleton-content"></div>
                <div className="skeleton-action-button skeleton-content"></div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default TodoSkeleton;
