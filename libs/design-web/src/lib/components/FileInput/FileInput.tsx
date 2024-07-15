import React, { useState, useRef } from 'react';

import { Key } from 'ts-key-enum';

import { FileReturnType, FileReturnTypeEnum } from 'shared/src/types/media';

import fileReaderResolver from 'shared/helpers/fileReaderResolver';

type FileInputProps = {
  accept?: string;
  type?: FileReturnTypeEnum;
  loading?: boolean;
  disabled?: boolean;
  enableMultiUpload?: boolean;
  onFilesSelected?: (files: FileReturnType[]) => void;
  onFileSelected?: (file: FileReturnType, name: string) => void;
  children?: any;
  dataCy?: string;
};

const FileInput: React.FC<FileInputProps> = ({
  accept = 'image/*',
  type = FileReturnTypeEnum.Image,
  loading = false,
  disabled = false,
  enableMultiUpload = false,
  onFileSelected = () => null,
  onFilesSelected = () => null,
  dataCy = 'fileInput',
  children,
}) => {
  const [isLoading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const fileSelected = (file: FileReturnType, name: string) => {
    setLoading(false);
    onFileSelected(file, name);
    reset();
  };

  const filesSelected = (files: FileReturnType[]) => {
    setLoading(false);
    onFilesSelected(files);
    reset();
  };

  const reset = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
    setLoading(false);
  };

  const resolveFile = async (file: File) => {
    setLoading(true);

    try {
      const resolvedFile = await fileReaderResolver(file, type);
      fileSelected(resolvedFile, file.name);
    } catch (err) {
      reset();
    }
  };

  const resolveFiles = async (files: File[]) => {
    setLoading(true);

    try {
      const resolved = await Promise.all(
        files.map(file => fileReaderResolver(file, type))
      );

      filesSelected(resolved);
    } catch (err) {
      reset();
    }
  };

  const onChange = () => {
    const fileInput = inputRef.current;

    if (!(fileInput?.files && fileInput?.files[0])) {
      reset();
      return;
    }

    const files = Array.from(fileInput.files) as File[];

    if (!enableMultiUpload) {
      const file = files[0];

      if (type === 'file') {
        fileSelected(file, file.name);
        return;
      }

      resolveFile(file);
      return;
    }

    if (type === 'file') {
      filesSelected(files);
      return;
    }

    resolveFiles(files);
  };

  return (
    <div>
      <form
        ref={formRef}
        role="button"
        onKeyPress={e => {
          if (e.key === Key.Enter) {
            e.stopPropagation();

            if (inputRef.current) {
              inputRef.current.click();
            }
          }
        }}
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();

          if (inputRef.current) {
            inputRef.current.click();
          }
        }}
      >
        <input
          disabled={disabled || isLoading}
          ref={inputRef}
          accept={accept}
          type="file"
          onClick={e => e.stopPropagation()}
          onChange={onChange}
          style={{ display: 'none' }}
          multiple={enableMultiUpload}
          data-testid="fileInput"
          data-cy={dataCy}
        />
        {children}
      </form>
    </div>
  );
};

export default FileInput;
