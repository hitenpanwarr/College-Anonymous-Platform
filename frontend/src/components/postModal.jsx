"use client";

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function Example({ deleteHandler,onClose }) {
  const [open, setOpen] = useState(true);
  const deleteButtonHandler = () => {
    setOpen(false);
    deleteHandler();
  };

  const closeModalHandler = () => {
    setOpen(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={closeModalHandler}className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full  justify-center p-4 text-center items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-xl bg-gray-900 text-left text-gray-200 shadow-2xl border border-gray-800 transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="card-bg px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-900/30 border border-red-800 sm:mx-0 sm:h-10 sm:w-10">
                  <ExclamationTriangleIcon
                    aria-hidden="true"
                    className="h-6 w-6 text-red-400"
                  />
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold leading-6 text-gray-200"
                  >
                    Delete Post
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-gray-400">
                      Delete Your Post permanently
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-bg px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={deleteButtonHandler}
                className="inline-flex w-full justify-center rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-lg hover:from-indigo-700 hover:to-purple-700 sm:ml-3 sm:w-auto"
              >
                Delete
              </button>
              <button
                type="button"
                data-autofocus
                onClick={closeModalHandler}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-gray-800 px-3 py-2 text-sm font-semibold text-gray-200 shadow-sm ring-1 ring-inset ring-gray-700 hover:bg-gray-700 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
