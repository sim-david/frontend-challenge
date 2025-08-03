import { Box, Typography, Button, IconButton, Stack } from "@mui/material";
import QrCodeIcon from "@mui/icons-material/QrCode";
import MoreVertIcon from "@mui/icons-material/MoreVert";

// Définition des props que le composant attend
interface HeaderProps {
  formId: string;
  onPinClick: () => void;
  onQrCodeClick: () => void;
  onMoreClick: () => void;
}

export const Header = ({
  formId,
  onPinClick,
  onQrCodeClick,
  onMoreClick,
}: HeaderProps) => {
  const expirationDate = "Disponible jusqu'au 10 déc. 2025";

  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        gap: { xs: 3, md: 2 },
        py: 2,
        px: 1,
        width: "100%",
      }}
    >
      {/* ... (La partie gauche du Header reste inchangée) ... */}
      <Box sx={{ position: "relative", pl: 2, pt: 1 }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: "bold",
            color: "#3F51B5",
            position: "relative",
            zIndex: 1,
          }}
        >
          Ma Campagne
        </Typography>
        <Box
          sx={{
            position: "absolute",
            top: "0px",
            left: "-20px",
            width: "360px",
            height: "80px",
            border: "3px solid #3F51B5",
            borderRadius: "50%",
            transform: "rotate(-5deg)",
            zIndex: 0,
          }}
        />
        <Typography
          sx={{
            position: "absolute",
            bottom: "-30px",
            right: "10px",
            color: "#FFA726",
            fontWeight: "bold",
            fontSize: "1.5rem",
            transform: "rotate(-10deg)",
            zIndex: 2,
          }}
        >
          * * *
        </Typography>
      </Box>

      {/* Section Droite: Les onClick sont maintenant liés aux props */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <Button
            variant="outlined"
            sx={{
              borderColor: "#673AB7",
              color: "#673AB7",
              borderWidth: "1px",
              borderLeft: "10px solid #673AB7",
              "&:hover": {
                borderWidth: "1px",
                borderLeft: "10px solid #673AB7",
              },
            }}
            onClick={onPinClick} // Logique de la modale
          >
            Mon Code PIN
          </Button>
          <Button
            variant="contained"
            startIcon={<QrCodeIcon />}
            sx={{
              backgroundColor: "#FB8C00",
              "&:hover": { backgroundColor: "#E65100" },
            }}
            onClick={onQrCodeClick} // Logique de la modale
          >
            QR Code
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit" // Déclenche la soumission du formulaire
            form={formId} // Lie ce bouton au formulaire via son ID
          >
            Sauvegarder
          </Button>
          <IconButton
            size="small"
            sx={{ border: "1px solid #E0E0E0" }}
            onClick={onMoreClick}
          >
            <MoreVertIcon />
          </IconButton>
        </Stack>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mt: 1, mr: 1 }}
        >
          {expirationDate}
        </Typography>
      </Box>
    </Box>
  );
};
