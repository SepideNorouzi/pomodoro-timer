import TaskList from "../components/Task/TaskList";
import Timer from "../components/Timer/Timer";

function AppLayout() {
  return (
    <div>
      <Timer duration={25 * 60} />
      <TaskList />
    </div>
  );
}

export default AppLayout;
