import { useMemo } from "react";
import { useFieldArray, useFormContext, Controller } from "react-hook-form";
import type { Configuration, Action } from "../../../doc/CampaignType"; // On importe 'Action' sans l'aliaser

import { v4 as uuidv4 } from "uuid"; // Import de la fonction pour générer des UUIDs

import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

// ... Le sous-composant ActionRow reste identique ...
interface ActionRowProps {
  index: number;
  onRemove: (index: number) => void;
}

const ActionRow = ({ index, onRemove }: ActionRowProps) => {
  const { control, watch } = useFormContext<Configuration>();
  const field = watch(`actions.${index}`);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const renderActionContent = () => {
    switch (field.type) {
      case "GOOGLE_REVIEW":
        return (
          <>
            <TableCell>
              <Box display="flex" alignItems="center">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Google_logo_2015_color.svg"
                  alt="Google"
                  width="20"
                  style={{ marginRight: 8 }}
                />
                Avis Google
              </Box>
            </TableCell>
            <TableCell>
              <Controller
                name={`actions.${index}.target`}
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    size="small"
                    fullWidth
                    placeholder="https://google.com/fr"
                  />
                )}
              />
            </TableCell>
          </>
        );
      case "FACEBOOK":
        return (
          <>
            <TableCell>Facebook</TableCell>
            <TableCell>
              <Controller
                name={`actions.${index}.target`}
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    size="small"
                    fullWidth
                    placeholder="https://facebook.com/profil"
                  />
                )}
              />
            </TableCell>
          </>
        );
      default:
        return <TableCell colSpan={2}>Action non reconnue</TableCell>;
    }
  };

  return (
    <TableRow ref={setNodeRef} style={style}>
      <TableCell
        sx={{ width: "5%", cursor: "grab" }}
        {...attributes}
        {...listeners}
      >
        <DragIndicatorIcon sx={{ color: "text.secondary" }} />
      </TableCell>
      <TableCell sx={{ width: "20%" }}>Action {index + 1}</TableCell>
      {renderActionContent()}
      <TableCell align="right">
        <IconButton onClick={() => onRemove(index)} size="small">
          <DeleteOutlineIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export const ActionList = () => {
  const { control, watch } = useFormContext<Configuration>();

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "actions",
  });

  const actionTypes = watch("actions")?.map((a) => a.type) || [];
  const hasDuplicates = useMemo(
    () => new Set(actionTypes).size !== actionTypes.length,
    [actionTypes]
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex((field) => field.id === active.id);
      const newIndex = fields.findIndex((field) => field.id === over.id);
      move(oldIndex, newIndex);
    }
  };

  // --- CORRECTION APPLIQUÉE ICI ---
  const addAction = () => {
    // On crée un objet complet de type 'Action'
    const newAction: Action = {
      id: uuidv4(), // On génère un ID unique
      priority: fields.length,
      target: "",
      type: "GOOGLE_REVIEW",
    };
    append(newAction);
  };

  return (
    <Paper variant="outlined" sx={{ p: 3 }}>
      {/* ... Le reste du JSX reste identique ... */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Box>
          <Typography variant="h6" component="h2">
            Organisez vos actions
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Définissez l'ordre et les actions à réaliser par vos clients.
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={addAction}>
          Ajouter une action
        </Button>
      </Box>

      {hasDuplicates && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          Attention : Vous avez configuré plusieurs fois la même action. Seule
          la première sera prise en compte.
        </Alert>
      )}

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={fields.map((field) => field.id)}
          strategy={verticalListSortingStrategy}
        >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Ordre</TableCell>
                  <TableCell>Action</TableCell>
                  <TableCell>Cible</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {fields.map((field, index) => (
                  <ActionRow key={field.id} index={index} onRemove={remove} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </SortableContext>
      </DndContext>
    </Paper>
  );
};
