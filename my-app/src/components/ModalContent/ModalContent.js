import { Button, Text } from "@mantine/core";

function ModalContent({ error, content, onConfirm, ...props }) {
  return (
    <div {...props}>
      <Text
        color={error ? "red" : "green"}
        style={{ textAlign: "center", marginBottom: 15 }}
      >
        {content}
      </Text>
      <Button
        data-testid="confirm-button"
        color={error ? "red" : "green"}
        fullWidth
        onClick={onConfirm}
      >
        Confirm
      </Button>
    </div>
  );
}

ModalContent.defaultProps = {
  error: false,
};

export default ModalContent;
