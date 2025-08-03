import { useFormContext, Controller, useWatch } from "react-hook-form";
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Button,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

type FormValues = {
  gifts: { name: string; type: string }[];
  globalConditionType: "NONE" | "MIN_PURCHASE";
  globalMinPurchaseValue?: string;
};

export const RetrievalConditions = () => {
  const { control } = useFormContext<FormValues>();

  const gifts = useWatch({ control, name: "gifts" });
  const conditionType = useWatch({ control, name: "globalConditionType" });
  const minPurchaseValue = useWatch({
    control,
    name: "globalMinPurchaseValue",
  });

  const displayableGifts = gifts.filter((g) => g.type !== "LOSS");

  const getConditionText = () => {
    if (conditionType === "MIN_PURCHASE") {
      return `Achat minimum de ${minPurchaseValue || "0€"}`;
    }
    return "Aucune";
  };

  return (
    <Box>
      <Controller
        name="globalConditionType"
        control={control}
        render={({ field }) => (
          <RadioGroup {...field} aria-label="condition-globale">
            <FormControlLabel
              value="NONE"
              control={<Radio />}
              label={
                <Box>
                  <Typography>Pas de condition</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Les clients peuvent récupérer leur gain sans aucun achat.
                  </Typography>
                </Box>
              }
            />
            <FormControlLabel
              value="MIN_PURCHASE"
              control={<Radio />}
              label={
                <Box>
                  <Typography>Sous condition d'achat minimale</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Exigez un montant minimum d'achat en boutique.
                  </Typography>
                </Box>
              }
            />
          </RadioGroup>
        )}
      />

      {conditionType === "MIN_PURCHASE" && (
        <Box sx={{ pl: 4, mt: 1, maxWidth: 400 }}>
          <Controller
            name="globalMinPurchaseValue"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Montant à atteindre"
                placeholder="Ex : 10€ d'achat minimum"
                fullWidth
                size="small"
              />
            )}
          />
        </Box>
      )}

      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
        Conditions personnalisées par gain
      </Typography>
      <TableContainer>
        <Table>
          <TableBody>
            {displayableGifts.map((gift, index) => (
              <TableRow key={index}>
                <TableCell>{gift.name}</TableCell>
                <TableCell>{getConditionText()}</TableCell>
                <TableCell align="right">
                  <Button startIcon={<EditIcon />} sx={{ mr: 1 }}>
                    Modifier
                  </Button>
                  <IconButton>
                    <DeleteOutlineIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              {/* CORRECTION : Le colSpan doit être de 3 pour couvrir toutes les colonnes de la table. */}
              <TableCell colSpan={3}>
                <Button startIcon={<AddIcon />} size="small">
                  Ajouter une condition personnalisée
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
