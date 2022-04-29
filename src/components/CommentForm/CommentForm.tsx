import classNames from 'classnames';
import Button from 'components/Button';
import Textarea from 'components/Textarea';
import { ConnectedFocusError } from 'focus-formik-error';
import { Formik } from 'formik';
import useUser from 'hooks/useUser';
import { useRouter } from 'next/router';
import getValidationSchema from 'utils/getValidationSchema';
import { object } from 'yup';
import styles from './CommentForm.module.scss';

export type CommentFormProps = {
  onSubmit: (values: { comment: string }) => Promise<void>;
  initialValues?: { comment: string };
  onCancel?: () => void;
  type?: 'create' | 'edit';
};

function CommentForm({
  onSubmit,
  initialValues,
  onCancel,
  type = 'create',
}: CommentFormProps) {
  const { isLoading, user } = useUser();
  const router = useRouter();

  return (
    <Formik
      initialValues={initialValues || { comment: '' }}
      validationSchema={object({
        comment:
          type === 'create'
            ? getValidationSchema('comment')
            : getValidationSchema('commentEdit'),
      })}
      onSubmit={async (values, { setFieldValue }) => {
        if (!values.comment && onCancel) {
          onCancel();
          return;
        }
        await onSubmit(values);
        setFieldValue('comment', '');
      }}
      validateOnChange={false}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        isSubmitting,
        setErrors,
      }) => {
        return (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (!isLoading && !user) router.push('/login');
              else handleSubmit(event);
            }}
            className={classNames(styles.form, styles[type])}
            data-testid="comment-form"
          >
            <ConnectedFocusError focusDelay={0} />
            <Textarea
              value={values.comment}
              onChange={(event) => {
                setErrors({ comment: undefined });
                handleChange(event);
              }}
              placeholder={type === 'create' ? '댓글을 남겨보세요' : ''}
              name="comment"
              minRows={type === 'create' ? 3 : undefined}
            />
            <div className={styles.formBottom}>
              {touched.comment && errors.comment && (
                <p className={styles.error}>{errors.comment}</p>
              )}
              <Button
                type="submit"
                disabled={isSubmitting}
                data-testid="submitButton"
              >
                {type === 'edit' ? '수정' : '작성'}
              </Button>
              {onCancel && (
                <Button
                  variant="plain"
                  onClick={(event) => {
                    event.preventDefault();
                    onCancel();
                  }}
                >
                  취소
                </Button>
              )}
            </div>
          </form>
        );
      }}
    </Formik>
  );
}

export default CommentForm;
