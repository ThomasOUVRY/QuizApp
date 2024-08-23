import Header from "./components/Header.tsx";
import QuizBody from "./components/QuizBody.tsx";
import { QuizSettingsContextProvider } from "./context/QuizSettings.context.tsx";
import SettingsSelector from "./components/SettingsSelector.tsx";

function App() {
  return (
    <QuizSettingsContextProvider>
      <Header title={"Quiz App React Certification"}>
        <SettingsSelector />
      </Header>
      <QuizBody></QuizBody>
    </QuizSettingsContextProvider>
  );
}

export default App;
