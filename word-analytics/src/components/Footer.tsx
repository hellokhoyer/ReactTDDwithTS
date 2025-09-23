type FooterProps = {
  lastCheckedAt: string | null;
};

function formatLastCheckedMessage(lastCheckedAt: string | null) {
  if (!lastCheckedAt) {
    return "Never";
  }

  const parsedDate = new Date(lastCheckedAt);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Unknown";
  }

  const now = Date.now();
  const elapsedMs = now - parsedDate.getTime();

  if (elapsedMs < 0) {
    return "In the future";
  }

  const daysElapsed = Math.floor(elapsedMs / (1000 * 60 * 60 * 24));

  if (daysElapsed === 0) {
    return "Today";
  }

  if (daysElapsed === 1) {
    return "1 day ago";
  }

  return `${daysElapsed} days ago`;
}

export default function Footer({ lastCheckedAt }: FooterProps) {
  return (
    <footer className="footer">
      <small>&copy; Abul Khoyer. All rights reserved.</small>
      <small>
        Last checked limits: {formatLastCheckedMessage(lastCheckedAt)}
      </small>
    </footer>
  );
}
