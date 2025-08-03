import { Container, CssBaseline } from "@mui/material";
import { CampaignConfigurationPage } from "./pages/CampaignConfigurationPage";

function App() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <CampaignConfigurationPage />
      </Container>
    </>
  );
}

export default App;
