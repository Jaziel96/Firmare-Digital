import { Container, Title, Button, FileInput } from "@mantine/core";
import { useState } from "react";

export default function Sign() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (file: File | null) => {
    setFile(file);
  };

  const handleSign = () => {
    if (file) {
      // Implementa la lógica para firmar el documento
      console.log("Firmando documento:", file.name);
    }
  };

  return (
    <Container>
      <Title order={1}>Firmar Documento</Title>
      <FileInput
        label="Seleccionar archivo PDF"
        placeholder="Selecciona el archivo PDF que deseas firmar"
        onChange={handleFileChange}
      />
      {file && <p>Archivo seleccionado: {file.name}</p>}
      <Button onClick={handleSign} mt="md">
        Firmar Documento
      </Button>
    </Container>
  );
}
