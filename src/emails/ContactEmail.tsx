/**
 * ContactEmail.tsx
 * ----------------
 * Template de l'email que TOI (Marcelo) tu reçois quand quelqu'un
 * remplit le formulaire de contact. Écrit avec @react-email/components
 * pour avoir un rendu correct dans TOUTES les boîtes mail (Gmail, Outlook...),
 * contrairement à du HTML/CSS classique qui casse souvent dans les emails.
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
} from "@react-email/components";

type ContactEmailProps = {
  name: string;
  email: string;
  message: string;
};

export default function ContactEmail({ name, email, message }: ContactEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: "#f5f5f5", fontFamily: "Arial, sans-serif", padding: "24px 0" }}>
        <Container
          style={{
            backgroundColor: "#ffffff",
            padding: "32px",
            borderRadius: "12px",
            maxWidth: "480px",
          }}
        >
          <Heading style={{ fontSize: "20px", color: "#0A0A0A" }}>
            Nouveau message depuis ton portfolio
          </Heading>

          <Section style={{ marginTop: "16px" }}>
            <Text style={{ margin: "4px 0" }}>
              <strong>Nom : </strong>{name}
            </Text>
            <Text style={{ margin: "4px 0" }}>
              <strong>Email : </strong>{email}
            </Text>
          </Section>

          <Hr style={{ borderColor: "#e5e5e5", margin: "20px 0" }} />

          <Text style={{ whiteSpace: "pre-wrap", color: "#171717" }}>
            {message}
          </Text>
        </Container>
      </Body>
    </Html>
  );
}