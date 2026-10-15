/**
 * ContactEmail.tsx
 * ----------------
 * Email reçu à chaque soumission du formulaire de contact.
 */
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Hr,
  Row,
  Column,
} from "@react-email/components";

type ContactEmailProps = {
  name: string;
  email: string;
  message: string;
};

export default function ContactEmail({
  name,
  email,
  message,
}: ContactEmailProps) {
  return (
    <Html>
      <Head />
      <Body
        style={{
          backgroundColor: "#0A0A0A",
          fontFamily: "Arial, Helvetica, sans-serif",
          padding: "40px 16px",
        }}
      >
        <Container
          style={{
            backgroundColor: "#111111",
            borderRadius: "16px",
            overflow: "hidden",
            maxWidth: "520px",
            border: "1px solid #262626",
          }}
        >
          {/* En-tête */}
          <Section
            style={{
              backgroundColor: "#0A0A0A",
              padding: "28px 32px",
              borderBottom: "1px solid rgba(34,197,94,0.25)",
            }}
          >
            <Text
              style={{
                color: "#22C55E",
                fontSize: "11px",
                letterSpacing: "2px",
                margin: 0,
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              Portfolio — Nouveau message
            </Text>
            <Heading
              style={{
                color: "#ffffff",
                fontSize: "20px",
                margin: "10px 0 0",
                fontWeight: 700,
              }}
            >
              Vous avez reçu une demande de contact
            </Heading>
          </Section>

          {/* Corps */}
          <Section style={{ padding: "32px" }}>
            <Text
              style={{
                color: "#9CA3AF",
                fontSize: "11px",
                margin: "0 0 4px",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              Nom
            </Text>
            <Text
              style={{
                color: "#ffffff",
                fontSize: "16px",
                margin: "0 0 20px",
                fontWeight: 600,
              }}
            >
              {name}
            </Text>

            <Text
              style={{
                color: "#9CA3AF",
                fontSize: "11px",
                margin: "0 0 4px",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              Email
            </Text>
            <Text
              style={{
                color: "#22C55E",
                fontSize: "16px",
                margin: "0 0 24px",
                fontWeight: 600,
              }}
            >
              {email}
            </Text>

            <Hr style={{ borderColor: "#262626", margin: "0 0 24px" }} />

            <Text
              style={{
                color: "#9CA3AF",
                fontSize: "11px",
                margin: "0 0 8px",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              Message
            </Text>
            <Text
              style={{
                color: "#E5E5E5",
                fontSize: "14px",
                lineHeight: "1.7",
                whiteSpace: "pre-wrap",
                margin: 0,
              }}
            >
              {message}
            </Text>
          </Section>

          {/* Pied de page */}
          <Section
            style={{
              backgroundColor: "#0A0A0A",
              padding: "18px 32px",
              borderTop: "1px solid #1f1f1f",
            }}
          >
            <Text
              style={{
                color: "#6B7280",
                fontSize: "11px",
                margin: 0,
                textAlign: "center",
              }}
            >
              Envoyé automatiquement depuis le formulaire de contact de ton
              portfolio.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}