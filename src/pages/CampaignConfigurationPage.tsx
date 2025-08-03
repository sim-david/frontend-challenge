import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Box, Modal, Typography, Divider } from "@mui/material";

import type { Configuration, Profile, GameType } from "../../doc/CampaignType";
import { Header } from "../components/Campaign/Header";
import { AlertsSection } from "../components/Campaign/AlertSection";
import { Section } from "../components/Campaign/Section";
import { ActionList } from "../components/Campaign/ActionList";
import { GameSelector } from "../components/Campaign/GameSelector";
import { GameCustomization } from "../components/Campaign/Customization";
import { RewardsConfig } from "../components/Campaign/RewardsConfig";
import { RetrievalConditions } from "../components/Campaign/RetrievalConditions";

const gameTypes: [GameType, ...GameType[]] = [
  "WHEEL",
  "SLOT_MACHINE",
  "MYSTERY",
  "CARD",
];

// Schéma de validation avec Zod pour gérer la logique complexe
const campaignSchema = z
  .object({
    actions: z.array(z.any()),
    colors: z.object({
      primary: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Format invalide"),
      secondary: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Format invalide"),
    }),
    disabled: z.boolean(),
    game_type: z.enum(gameTypes),
    gifts: z.array(z.any()),
    retrievalConditions: z.array(z.any()),
    logo_uri: z.string(),
    is100PercentWinner: z.boolean(),
    globalConditionType: z.enum(["NONE", "MIN_PURCHASE"]),
    globalMinPurchaseValue: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    // Si le jeu est 100% gagnant, on vérifie qu'au moins un gain est illimité
    if (data.is100PercentWinner) {
      const hasUnlimitedGift = data.gifts.some(
        (gift) => gift.initial_limit === -1 && gift.type !== "LOSS"
      );
      if (!hasUnlimitedGift) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["gifts.root"], // Erreur globale sur le tableau des gains
          message:
            "Pour un jeu 100% gagnant, au moins un gain doit être en quantité illimitée.",
        });
      }
    }
  });

// Style pour le contenu de la modale
const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// Type étendu pour inclure les champs non présents dans la configuration API
type FormValues = Configuration & {
  is100PercentWinner: boolean;
  globalConditionType: "NONE" | "MIN_PURCHASE";
  globalMinPurchaseValue?: string;
};

export const CampaignConfigurationPage = () => {
  const [openModal, setOpenModal] = useState<"pin" | "qrcode" | "more" | null>(
    null
  );
  const formId = "campaign-form";

  // Simulation des données de la campagne
  const isPinConfigured = false;
  const campaignProfile: Profile = "PREMIUM"; // Changer en 'BASIC' pour tester

  const methods = useForm<FormValues>({
    resolver: zodResolver(campaignSchema),
    defaultValues: {
      actions: [
        {
          id: "1",
          type: "GOOGLE_REVIEW",
          target: "https://google.com/fr",
          priority: 0,
        },
      ],
      game_type: "WHEEL",
      logo_uri: "",
      colors: {
        primary: "#3F5EFB",
        secondary: "#F5A623",
      },
      gifts: [],
      is100PercentWinner: true,
      disabled: false, // Ajout de la valeur par défaut
      retrievalConditions: [], // Ajout de la valeur par défaut
      globalConditionType: "MIN_PURCHASE",
      globalMinPurchaseValue: "10€",
    },
  });

  const onSave = (data: FormValues) => {
    // Ici, vous pourriez filtrer les données pour ne garder que le type 'Configuration'
    // avant de les envoyer à une API.
    console.log("Données de la campagne à sauvegarder :", data);
    alert("Campagne sauvegardée ! (voir la console)");
  };

  const handleCloseModal = () => setOpenModal(null);

  return (
    <FormProvider {...methods}>
      <Header
        formId={formId}
        onPinClick={() => setOpenModal("pin")}
        onQrCodeClick={() => setOpenModal("qrcode")}
        onMoreClick={() => setOpenModal("more")}
      />

      <Divider sx={{ my: 2 }} />
      <AlertsSection isPinConfigured={isPinConfigured} />

      <form
        id={formId}
        onSubmit={methods.handleSubmit(onSave, (errors) =>
          console.log("Erreurs de validation:", errors)
        )}
      >
        <Section
          title="Organisez vos actions"
          subtitle="Définissez l'ordre et les actions à réaliser par vos clients."
        >
          <ActionList />
        </Section>

        <Section
          title="Choix du jeu"
          subtitle="Sélectionnez parmi 4 jeux interactifs pour engager vos utilisateurs."
        >
          <GameSelector profile={campaignProfile} />
        </Section>

        <Section
          title="Personnalisez votre jeu"
          subtitle="Importez votre logo et sélectionnez vos couleurs pour créer un jeu à l'image de votre marque."
        >
          <GameCustomization profile={campaignProfile} />
        </Section>

        <Section
          title="Ajoutez et configurez vos gains"
          subtitle="Indiquez les récompenses que vos clients pourront gagner."
        >
          <RewardsConfig />
        </Section>
        <Section
          title="Définissez les conditions pour récupérer les cadeaux"
          subtitle="Paramétrez si vos clients doivent remplir une condition pour pouvoir repartir avec leur cadeau."
        >
          <RetrievalConditions />
        </Section>
      </form>

      <Modal open={openModal !== null} onClose={handleCloseModal}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">
            {openModal === "pin" && "Modale du Code PIN"}
            {openModal === "qrcode" && "Modale du QR Code"}
            {openModal === "more" && "Autres Options"}
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Le contenu de la modale est affiché ici.
          </Typography>
        </Box>
      </Modal>
    </FormProvider>
  );
};
