export default function LoadingSkeleton() {
    return (
      <div className="event-card loading">
        <div className="event-image loading"></div>
        <div className="event-details">
          <div className="event-date loading"></div>
          <h3 className="loading"></h3>
          <p className="venue loading"></p>
          <div className="event-footer">
            <span className="category loading"></span>
            <div className="ticket-button loading"></div>
          </div>
        </div>
      </div>
    );
  }