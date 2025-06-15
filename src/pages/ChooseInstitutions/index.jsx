import { FormProvider, useForm } from "react-hook-form";
import { Button, SelectForm } from "src/components";
import { CHOOSE_INSTITUTIONS_SCHEMA } from "./lib/choose-institutions.validator";
import useChooseInstitutionsHooks from "./stores/choose-institutions.hooks";

const ChooseInstitutions = () => {
  const methods = useForm({
    resolver: CHOOSE_INSTITUTIONS_SCHEMA,
  });

  const { schoolList, handleSubmit } = useChooseInstitutionsHooks();

  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center">
      <div className="border shadow rounded bg-white min-w-[400px]">
        <div className="border-b flex justify-center space-x-1 text-4xl py-4">
          <b>BPK</b>
          <span>PENABUR</span>
        </div>
        <div className="p-4 space-y-4">
          <label>Silahkan Masuk pilih sekolah yang ingin dituju</label>
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <SelectForm
                name={"foundation"}
                options={schoolList}
                getOptionLabel={(opt) => opt?.institution}
              />

              <div className="flex justify-center">
                <Button
                  type="submit"
                  className="text-white border-gray-600 bg-gray-600 hover:bg-gray-700 hover:border-gray-700 flex-1 py-2 space-x-1"
                >
                  Masuk
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default ChooseInstitutions;
