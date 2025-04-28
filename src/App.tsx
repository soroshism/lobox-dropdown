import MultiSelectDropdown from "./MultiSelectDropdown";

const App: React.FC = () => {
  const options = [
    { label: "Education", value: "education", emoji: "🎓" },
    { label: "Art", value: "art", emoji: "🎨" },
    { label: "Sport", value: "sport", emoji: "⚽" },
    { label: "Games", value: "games", emoji: "🎮" },
    { label: "Health", value: "health", emoji: "🏥" },
  ];

  return (
    <div style={{ padding: "50px" }}>
      <MultiSelectDropdown options={options} placeholder="Science" />
    </div>
  );
};

export default App;
