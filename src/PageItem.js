import "./Page.css";

export default function PageItem({ className }) {
  return (
    <div className={`page ${className}`}>
      <p>페이지아이템</p>
    </div>
  );
}
