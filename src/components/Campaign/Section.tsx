import type { ReactNode } from "react";
import { Box, Typography, Divider } from "@mui/material";

interface SectionProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export const Section = ({ title, subtitle, children }: SectionProps) => {
  return (
    <Box component="section" sx={{ my: 8 }}>
      <Box
        sx={{
          mb: 4,
          pl: 2,
          borderRadius: "4px",
          borderLeft: "10px solid #1976d2",
        }}
      >
        <Typography variant="h5" component="h2" sx={{ fontWeight: "bold" }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      </Box>
      {children}
      <Divider sx={{ mb: 8, mt: 8 }} />
    </Box>
  );
};
