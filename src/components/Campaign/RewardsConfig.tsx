import { useEffect } from "react";
import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import type { Configuration, GiftType } from "../../../doc/CampaignType";
import { v4 as uuidv4 } from "uuid";

import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  IconButton,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

// Définition d'un type étendu pour le formulaire
type FormValues = Configuration & { is100PercentWinner: boolean };

// Options pour le select de catégorie, en excluant 'LOSS'
const giftTypeOptions: Exclude<GiftType, "LOSS">[] = [
  "EAT",
  "DRINK",
  "DISCOUNT",
];

export const RewardsConfig = () => {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<FormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "gifts",
  });

  const is100PercentWinner = watch("is100PercentWinner");

  // Effet pour ajouter/supprimer automatiquement le lot "Perdu"
  useEffect(() => {
    const gifts = watch("gifts");
    const lossIndex = gifts.findIndex((g) => g.type === "LOSS");

    if (!is100PercentWinner) {
      // Si le jeu n'est PAS 100% gagnant
      if (lossIndex === -1) {
        // et qu'il n'y a pas de lot "Perdu", on l'ajoute
        append(
          {
            id: uuidv4(),
            type: "LOSS",
            name: "Perdu",
            icon: "loss-icon",
            initial_limit: -1, // Toujours illimité
            limit: -1,
          },
          { shouldFocus: false }
        );
      }
    } else {
      // Si le jeu est 100% gagnant
      if (lossIndex !== -1) {
        // et qu'un lot "Perdu" existe, on le supprime
        remove(lossIndex);
      }
    }
  }, [is100PercentWinner, append, remove, watch]);

  const addNewGift = () => {
    append({
      id: uuidv4(),
      name: "Nouveau Gain",
      type: "EAT",
      icon: "default-icon",
      initial_limit: 10,
      limit: 10,
    });
  };

  // On filtre le lot "Perdu" pour ne pas l'afficher dans le tableau éditable
  const editableFields = fields.filter((field) => field.type !== "LOSS");
  const lossField = fields.find((field) => field.type === "LOSS");

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Controller
          name="is100PercentWinner"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Switch {...field} checked={field.value} />}
              label="Jeu 100% Gagnant"
            />
          )}
        />
        <Box>
          <Button variant="contained" color="warning" sx={{ mr: 1 }}>
            Lancer le tirage au sort
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={addNewGift}
          >
            Ajouter un gain
          </Button>
        </Box>
      </Box>

      {/* Affichage de l'erreur de validation personnalisée */}
      {errors.gifts?.root && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errors.gifts.root.message}
        </Alert>
      )}

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom du Gain</TableCell>
              <TableCell>Catégorie</TableCell>
              <TableCell>Nombre de stock</TableCell>
              <TableCell>Illimité</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {editableFields.map((field, index) => {
              const isUnlimited = watch(`gifts.${index}.initial_limit`) === -1;
              return (
                <TableRow key={field.id}>
                  <TableCell>
                    <Controller
                      name={`gifts.${index}.name`}
                      control={control}
                      render={({ field }) => (
                        <TextField {...field} size="small" fullWidth />
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <Controller
                      name={`gifts.${index}.type`}
                      control={control}
                      render={({ field }) => (
                        <Select {...field} size="small" fullWidth>
                          {giftTypeOptions.map((opt) => (
                            <MenuItem key={opt} value={opt}>
                              {opt}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <Controller
                      name={`gifts.${index}.initial_limit`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          type="number"
                          size="small"
                          disabled={isUnlimited}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value, 10) || 0)
                          }
                        />
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={isUnlimited}
                      onChange={(e) => {
                        const newLimit = e.target.checked ? -1 : 10; // Mettre -1 si illimité, sinon 10 par défaut
                        setValue(`gifts.${index}.initial_limit`, newLimit);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => remove(index)}>
                      <DeleteOutlineIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
            {/* Affiche la ligne "Perdu" si elle existe, mais non-éditable */}
            {lossField && (
              <TableRow sx={{ backgroundColor: "grey.100" }}>
                <TableCell>Perdu</TableCell>
                <TableCell>Perte</TableCell>
                <TableCell>N/A</TableCell>
                <TableCell>N/A</TableCell>
                <TableCell />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
