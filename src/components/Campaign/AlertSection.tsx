import { Alert, AlertTitle, Box, Button, Stack } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

// Définition des props pour contrôler l'affichage des alertes
interface AlertsSectionProps {
  isPinConfigured: boolean;
}

export const AlertsSection = ({ isPinConfigured }: AlertsSectionProps) => {
  return (
    <Stack sx={{ width: "100%", my: 2 }} spacing={2}>
      {/* Alerte 1: Code PIN non configuré (affichée conditionnellement) */}
      {!isPinConfigured && (
        <Alert
          severity="warning"
          icon={
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 40,
                height: 40,
                borderRadius: "50%",
                backgroundColor: "white",
                boxShadow: 1,
              }}
            >
              <LockOutlinedIcon sx={{ color: "#FBC02D" }} />
            </Box>
          }
          action={
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#FBC02D",
                color: "#424242",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#F9A825" },
              }}
            >
              Configurer mon code
            </Button>
          }
          sx={{
            alignItems: "center",
            backgroundColor: "#FFFDE7", // Fond jaune pâle
            borderRadius: "16px", // Bords arrondis
            border: "1px solid #FBC02D",
          }}
        >
          <AlertTitle sx={{ fontWeight: "bold" }}>
            Votre Code PIN n'est pas configuré
          </AlertTitle>
          Activez-le pour sécuriser la récupération des cadeaux par vos clients.
        </Alert>
      )}

      {/* Alerte 2: Importance des couleurs (information) */}
      <Alert severity="info" icon={<InfoOutlinedIcon />}>
        <AlertTitle>Personnalisez vos couleurs</AlertTitle>
        L'utilisation de couleurs personnalisées renforce votre image de marque
        et augmente l'engagement des joueurs.
      </Alert>
    </Stack>
  );
};
