import { useForm, useFieldArray } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { api } from '../../services/axios'
import { toast } from 'react-toastify'

const createPollFormSchema = z.object({
  title: z.string().min(1, 'O título da enquete é obrigatório.'),
  options: z
    .array(
      z.object({
        title: z.string().min(1, 'O nome da opção é obrigatório.'),
      }),
    )
    .min(2, 'Insira pelo menos 2 opções.'),
})

type CreatePollFormData = z.infer<typeof createPollFormSchema>

export function NewPoll() {
  // ** Hooks
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<CreatePollFormData>({
    resolver: zodResolver(createPollFormSchema),
  })

  const { fields, append } = useFieldArray({
    control,
    name: 'options',
  })

  // ** Functions
  async function transformData(data: CreatePollFormData) {
    return {
      title: data.title,
      options: data.options.map((nobj: { title: string }) => nobj.title),
    }
  }

  async function createPoll(data: CreatePollFormData) {
    try {
      const transformedData = await transformData(data)

      await api.post('/polls', transformedData)

      toast.success('Poll created successfully!')
    } catch (err) {
      toast.success('Unable to create poll, please try again!')
    }
  }

  function addNewOption() {
    append({ title: '' })
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-[#0d1321] text-2xl">Create your custom poll</h1>

      <form
        onSubmit={handleSubmit(createPoll)}
        className="flex flex-col gap-4 w-full max-w-xs mt-12"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-[#1d2d44]">
            Title
          </label>
          <input
            type="text"
            className="bg-[#748cab] outline-none opacity-50 shadow-md rounded-md h-10 px-3 text-[#0d1321]"
            {...register('title')}
          />
          {errors.title && (
            <span className="text-red-500 text-sm">{errors.title.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor=""
            className="flex items-center justify-between text-[#1d2d44]"
          >
            Options
            <button
              type="button"
              onClick={addNewOption}
              className="text-[#0d1321] text-sm"
            >
              + Adicionar
            </button>
          </label>
          {fields.map((field, index) => {
            return (
              <div key={field.id} className="flex gap-2">
                <div className="flex-1 flex flex-col gap-1">
                  <input
                    type="text"
                    className="bg-[#748cab] opacity-50 outline-none shadow-md rounded-md h-10 px-3 text-[#0d1321]"
                    {...register(`options.${index}.title`)}
                  />
                  {errors.options?.[index]?.title && (
                    <span className="text-red-500 text-sm">
                      {errors.options?.[index]?.title?.message}
                    </span>
                  )}
                </div>
              </div>
            )
          })}
          {errors.options && (
            <span className="text-red-500 text-sm">
              {errors.options.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="bg-[#0d1321] rounded font-semibold text-white h-10 hover:bg-[#0d1321] hover:opacity-90"
        >
          Salvar
        </button>
      </form>
    </div>
  )
}
