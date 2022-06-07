import { Button, Group, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useModals } from "@mantine/modals";
import ModalContent from "../../../components/ModalContent/ModalContent";
import feedbackService from "../../../services/feedback";

const CLEAN_FORM = {
  content: "",
};

function FeedbackForm({ onSubmit }) {
  const form = useForm({
    initialValues: {
      ...CLEAN_FORM,
    },
  });
  const modals = useModals();

  const handleClear = () => {
    form.setValues({ ...CLEAN_FORM });
  };

  const handleSubmit = ({ content }) => {
    if (onSubmit) onSubmit();

    feedbackService
      .add({ content })
      .then(() => {
        const id = modals.openModal({
          centered: true,
          closeButtonLabel: "Close modal",
          children: (
            <ModalContent
              data-testid="success-modal"
              content="WE HAVE GOT YOUR FEEDBACK"
              onConfirm={() => modals.closeModal(id)}
            />
          ),
        });
      })
      .catch((error) => {
        const id = modals.openModal({
          centered: true,
          closeButtonLabel: "Close modal",
          children: (
            <ModalContent
              data-testid="fail-modal"
              error
              content="SOMETHING WRONG!"
              onConfirm={() => modals.closeModal(id)}
            />
          ),
        });
      });
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <div data-testid="feedback-form">
        <Textarea
          data-testid="content-input"
          label="Send Your Feedback"
          placeholder="Your feedback"
          required
          {...form.getInputProps("content")}
        />

        <Group position="right" mt="md">
          <Button data-testid="clear-button" color="red" onClick={handleClear}>
            Clear
          </Button>
          <Button data-testid="send-button" type="submit">
            Send
          </Button>
        </Group>
      </div>
    </form>
  );
}

export default FeedbackForm;
