import { add } from "@jgjgill/math";
import { useUnmount } from "@jgjgill/hooks";

function App() {
  useUnmount();
  return (
    <div>
      <h2>hello world jgjgill</h2>
      {add(1, 4)}
    </div>
  );
}

export default App;
