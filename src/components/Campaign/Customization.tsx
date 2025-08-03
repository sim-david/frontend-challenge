import { useCallback } from "react";
import { useFormContext, Controller, useWatch } from "react-hook-form";
import type { Configuration, Profile } from "../../../doc/CampaignType";
import { useDropzone } from "react-dropzone";

import {
  Box,
  Button,
  Typography,
  Paper,
  TextField,
  Grid,
  Tooltip,
  Stack,
} from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

interface GameCustomizationProps {
  profile: Profile;
}

export const GameCustomization = ({ profile }: GameCustomizationProps) => {
  const { control, setValue } = useFormContext<Configuration>();
  const isDisabled = profile === "BASIC";

  // --- Logique pour le Drag & Drop du logo ---
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles[0]) {
        const file = acceptedFiles[0];
        const previewUrl = URL.createObjectURL(file);
        // On met à jour la valeur dans le formulaire
        setValue("logo_uri", previewUrl, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".png", ".gif", ".svg"] },
    multiple: false,
    disabled: isDisabled,
  });

  const logoUri = useWatch({ control, name: "logo_uri" });
  const primaryColor = useWatch({ control, name: "colors.primary" });
  const secondaryColor = useWatch({ control, name: "colors.secondary" });

  return (
    <Paper variant="outlined" sx={{ p: 3 }}>
      <Grid container spacing={4} direction={{ xs: "column", md: "row" }}>
        {/* === Section Logo === */}
        <Grid
          sx={{
            flexBasis: { xs: "100%", md: "45%" },
            maxWidth: { xs: "100%", md: "45%" },
          }}
        >
          <Typography variant="subtitle1" gutterBottom>
            Glissez-déposez votre logo
          </Typography>
          <Box
            {...getRootProps()}
            sx={{
              p: 2,
              border: "2px dashed",
              borderColor: isDragActive ? "primary.main" : "grey.300",
              borderRadius: 2,
              textAlign: "center",
              cursor: isDisabled ? "not-allowed" : "pointer",
              backgroundColor: isDisabled
                ? "grey.100"
                : isDragActive
                ? "action.hover"
                : "transparent",
              opacity: isDisabled ? 0.6 : 1,
              minHeight: 200,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <input {...getInputProps()} />
            {logoUri ? (
              <img
                src={logoUri}
                alt="Aperçu du logo"
                style={{
                  maxWidth: "80%",
                  maxHeight: 150,
                  objectFit: "contain",
                }}
              />
            ) : (
              <Stack alignItems="center" spacing={1}>
                <FileUploadIcon sx={{ fontSize: 40, color: "grey.500" }} />
                <Typography color="text.secondary">
                  {isDragActive
                    ? "Déposez le fichier ici..."
                    : "Glissez un fichier ou cliquez"}
                </Typography>
              </Stack>
            )}
            <Button variant="contained" sx={{ mt: 2 }} disabled={isDisabled}>
              Sélectionner un fichier
            </Button>
          </Box>
        </Grid>

        {/* === Section Couleurs === */}
        <Grid
          sx={{
            flexBasis: { xs: "100%", md: "45%" },
            maxWidth: { xs: "100%", md: "45%" },
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="subtitle1">Importer vos couleurs</Typography>
            <Tooltip title="Voir l'aperçu du jeu (fonctionnalité non implémentée)">
              <Button startIcon={<VisibilityOutlinedIcon />} size="small">
                Voir l'aperçu
              </Button>
            </Tooltip>
          </Box>

          <Stack
            direction="row"
            spacing={3}
            sx={{ mt: 2, p: 2, justifyContent: "center" }}
          >
            {/* Couleur Primaire */}
            <Stack alignItems="center" spacing={1}>
              <Box
                sx={{
                  width: 60,
                  height: 120,
                  borderRadius: 30,
                  backgroundColor: primaryColor || "grey.300",
                  border: "1px solid #ddd",
                }}
              />
              <Controller
                name="colors.primary"
                control={control}
                rules={{
                  required: "Ce champ est requis",
                  pattern: {
                    value: /^#[0-9A-Fa-f]{6}$/,
                    message: "Format hexadécimal invalide (#RRGGBB)",
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label="Primaire"
                    size="small"
                    disabled={isDisabled}
                    error={!!error}
                    helperText={error?.message}
                    sx={{ width: 120 }}
                  />
                )}
              />
            </Stack>
            {/* Couleur Secondaire */}
            <Stack alignItems="center" spacing={1}>
              <Box
                sx={{
                  width: 60,
                  height: 120,
                  borderRadius: 30,
                  backgroundColor: secondaryColor || "grey.300",
                  border: "1px solid #ddd",
                }}
              />
              <Controller
                name="colors.secondary"
                control={control}
                rules={{
                  required: "Ce champ est requis",
                  pattern: {
                    value: /^#[0-9A-Fa-f]{6}$/,
                    message: "Format hexadécimal invalide (#RRGGBB)",
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label="Secondaire"
                    size="small"
                    disabled={isDisabled}
                    error={!!error}
                    helperText={error?.message}
                    sx={{ width: 120 }}
                  />
                )}
              />
            </Stack>
          </Stack>
          {isDisabled && (
            <Typography
              variant="caption"
              color="text.secondary"
              align="center"
              component="p"
              sx={{ mt: 1 }}
            >
              La personnalisation est une fonctionnalité PREMIUM.
            </Typography>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};
