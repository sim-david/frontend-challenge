import { useFormContext, Controller } from "react-hook-form";
import type { Configuration, Profile } from "../../../doc/CampaignType";

import {
  ToggleButtonGroup,
  ToggleButton,
  Card,
  CardMedia,
  Grid,
} from "@mui/material";

interface GameSelectorProps {
  profile: Profile;
}

const gameOptions = [
  {
    value: "WHEEL",
    title: "Roue de la Fortune",
    image: "/src/assets/wheel.jpg",
  },
  {
    value: "MYSTERY",
    title: "Les Boîtes Mystères",
    image: "/src/assets/mystery.png",
  },
  {
    value: "SLOT_MACHINE",
    title: "Machine à Sous",
    image: "/src/assets/slot.png",
  },
  { value: "CARD", title: "Jeu de Cartes", image: "/src/assets/card.png" },
];

export const GameSelector = ({ profile }: GameSelectorProps) => {
  const { control } = useFormContext<Configuration>();
  const isDisabled = profile === "BASIC";

  return (
    <Controller
      name="game_type"
      control={control}
      render={({ field: { onChange, value } }) => (
        <ToggleButtonGroup
          value={value}
          exclusive
          onChange={(_, newValue) => {
            if (newValue !== null) {
              onChange(newValue);
            }
          }}
          aria-label="Sélection du jeu"
          disabled={isDisabled}
          sx={{ width: "100%" }}
        >
          <Grid
            container
            direction="row"
            sx={{
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            {gameOptions.map((option) => (
              <Grid key={option.value}>
                <ToggleButton
                  value={option.value}
                  aria-label={option.title}
                  sx={{
                    p: 0,
                    border: "4px solid transparent",
                    borderRadius: 2,
                    "&.Mui-selected": {
                      borderColor: "primary.main",
                      backgroundColor: "primary.light",
                    },
                    "&.Mui-disabled": {
                      border: "4px solid transparent",
                    },
                  }}
                >
                  <Card>
                    <CardMedia
                      component="img"
                      image={option.image}
                      alt={option.title}
                      sx={{
                        width: 265,
                        objectFit: "contain",
                        backgroundColor: "#f0f0f0",
                      }}
                    />
                  </Card>
                </ToggleButton>
              </Grid>
            ))}
          </Grid>
        </ToggleButtonGroup>
      )}
    />
  );
};
