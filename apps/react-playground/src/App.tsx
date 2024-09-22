import { useUnmount } from "@jgjgill/hooks";

function App() {
  useUnmount(() => {
    console.log("unmount");
  });
  return (
    <div>
      <h2>hello world jgjgill</h2>
    </div>
  );
}

export default App;
