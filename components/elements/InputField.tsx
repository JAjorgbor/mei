'use client'

import {
  Autocomplete,
  AutocompleteItem,
  Checkbox,
  cn,
  Divider,
  Select,
  SelectItem,
  Switch,
  useRadio,
  VisuallyHidden,
} from '@heroui/react'
import { FC, ReactNode, useEffect, useRef, useState } from 'react'
import { SketchPicker } from 'react-color'
import {
  FileIcon,
  SearchIcon,
  PaintbrushIcon,
  CheckIcon,
  HashIcon,
  EyeIcon,
  EyeOffIcon,
  XIcon,
} from 'lucide-react'

import OtpInput from 'react-otp-input'
import { twMerge } from 'tailwind-merge'
interface InputFieldPropsBase {
  type:
    | 'text'
    | 'email'
    | 'textarea'
    | 'select'
    | 'autocomplete'
    | 'password'
    | 'checkbox'
    | 'switch'
    | 'date'
    | 'radio'
    | 'file'
    | 'number'
    | 'phoneNumber'
    | 'passCode'
    | 'amount'
    | 'color'
    | 'weight'
    | 'image'
    | 'search'
    | 'postal-code'
  startContent?: ReactNode
  selectSize?: 'sm' | 'md'
  endContent?: ReactNode
  label?: string | ReactNode
  value?: string | number | boolean
  disabled?: boolean
  defaultValue?: string | number
  maxLength?: number
  switchSize?: 'sm' | 'md'
  showSwitchIcon?: boolean
  codeLength?: number
  rows?: number
  allowShowPassword?: boolean
  onChange?: (arg0: any) => void
  defaultChecked?: boolean
  name?: string
  options?: {
    value: string | number | null
    label: ReactNode
    className?: string
    endContent?: ReactNode
    disabled?: boolean
  }[]
  autoComplete?: string
  placeholder?: string
  errorMessage?: any
  isName?: boolean
  isUsername?: boolean
  className?: string
  classNames?: {
    label?: string
    input?: string
    base?: string
  }
  noWhiteSpace?: boolean
  prefixFieldLabel?: ReactNode
  min?: number
  isRequired?: boolean
  renderLabelRight?: boolean
  renderLabelLeft?: boolean
  control?: any
}

type InputFieldTypesThatRequireOnChange =
  | 'autocomplete'
  | 'select'
  | 'checkbox'
  | 'passCode'
  | 'amount'

type InputFieldProps =
  | (InputFieldPropsBase & {
      type: Exclude<
        InputFieldPropsBase['type'],
        InputFieldTypesThatRequireOnChange
      >
      register: any
    })
  | (InputFieldPropsBase & {
      type: InputFieldTypesThatRequireOnChange
      register?: never // `register` is not allowed for these types
    })

const InputField: FC<InputFieldProps> = ({
  type,
  label,
  value,
  rows = 4,
  maxLength,
  codeLength = 6,
  disabled = false,
  defaultChecked = false,
  placeholder,
  allowShowPassword = true,
  defaultValue,
  onChange = () => null,
  switchSize = 'sm',
  showSwitchIcon = true,
  noWhiteSpace = false,
  renderLabelRight = false,
  renderLabelLeft = false,
  min = 1,
  selectSize = 'md',
  startContent = null,
  endContent = null,
  className = '',
  classNames = { label: '', input: '', base: '' },
  isName = false,
  isUsername = false,
  isRequired = false,
  autoComplete = 'off',
  errorMessage = '',
  options,
  register,
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const [fileName, setFileName] = useState('No File Chosen')
  const [selectFieldValue, setSelectFieldValue] = useState<any>([''])
  const [amountValue, setAmountValue] = useState(value || '')
  const [disabledKeys, setDisabledKeys] = useState<string[]>()
  const [showDropdown, setShowDropdown] = useState(false)
  const colorPickerRef = useRef<HTMLDivElement>(null)

  const formatToCurrency = (value: string) => {
    // Remove non-numeric characters except decimal
    const numericValue = value.replace(/[^\d.]/g, '')

    // Format the number as currency
    const parts = numericValue.split('.')

    // Format integer part with commas
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')

    // Join with the decimal part if it exists
    return parts.length > 1
      ? `${integerPart}.${parts[1].slice(0, 2)}`
      : `${integerPart}`
  }

  useEffect(() => {
    if (type == 'amount') {
      const rawValue = value || 0
      const formattedValue = formatToCurrency(String(rawValue))
      setAmountValue(formattedValue)
      // Notify parent component with the numeric value
    }
  }, [value, type])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element | null
      const relatedTarget = event.relatedTarget as Element | null
      // Ensure the click is outside the colorPickerRef
      if (
        target &&
        relatedTarget !== colorPickerRef.current &&
        colorPickerRef.current &&
        !colorPickerRef.current?.contains(relatedTarget)
      ) {
        setShowDropdown(false)
      }
    }
    document.body.addEventListener('click', handleClickOutside)
    return () => {
      document.body.removeEventListener('click', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (defaultValue || value)
      setSelectFieldValue(new Set([defaultValue || value]))
  }, [defaultValue, value])

  const baseClass = twMerge(
    'w-full p-2 py-2 block text-nevada rounded-md border border-gray-200 ',
    startContent && 'rounded-l-none border-gray-200 border-l-none',
    !!errorMessage ? 'bg-red-100 border-red-500' : 'bg-background',
    'dark:border-gray-700 dark:text-gray-300',
    className,
    classNames.input,
    disabled && 'cursor-not-allowed',
    'focus:outline-secondary disabled:bg-gray-100 bg-default-100',
    `${selectSize == 'sm' && type == 'select' ? 'h-7 min-h-7' : ''}`
  )

  useEffect(() => {
    if (options) {
      const array = options?.filter((each) => each.disabled)
      const keys = array.map((each) => String(each.value))
      return setDisabledKeys(keys)
    }
    return setDisabledKeys([''])
  }, [options])

  const renderInput = () => {
    switch (type) {
      case 'text':
        return (
          <input
            disabled={disabled}
            type=''
            className={`${baseClass} `}
            {...register}
            value={value ?? register?.value}
            defaultValue={defaultValue ?? register?.defaultValue}
            maxLength={maxLength}
            onChange={(e) => {
              if (isName) {
                e.target.value =
                  e.target.value.charAt(0).toUpperCase() +
                  e.target.value.slice(1)
                e.target.value = e.target.value.replace(/\s+/, '')
              }
              if (isUsername) {
                e.target.value = e.target.value.toLowerCase()
                e.target.value = e.target.value.replace(/\s+/, '')
              }
              if (noWhiteSpace) {
                e.target.value = e.target.value.replace(/\s/g, '')
              }
              register.onChange(e)
            }}
            placeholder={placeholder}
          />
        )
      case 'date':
        return (
          <input
            disabled={disabled}
            type='date'
            className={`${baseClass} `}
            {...register}
            value={value ?? register?.value}
            defaultValue={defaultValue ?? register?.defaultValue}
          />
        )
      case 'search':
        return (
          <div className='flex items-center gap-2'>
            <input
              type='search'
              className={`${baseClass}`}
              placeholder={placeholder}
              {...register}
              value={value ?? register?.value}
              disabled={disabled}
              onChange={(e) => {
                register?.onChange(e)
                if (onChange) onChange(e)
              }}
              defaultValue={defaultValue ?? register?.defaultValue}
            />
            <button
              type='button'
              className='p-2 rounded-md bg-blue-100 hover:bg-blue-200 text-primary'
            >
              <SearchIcon size={18} />
            </button>
          </div>
        )
      case 'email':
        return (
          <input
            type='email'
            className={`${baseClass} `}
            maxLength={maxLength}
            {...register}
            disabled={disabled}
            value={value ?? register?.value}
            onChange={(e) => {
              e.target.value = e.target.value.toLowerCase().replace(/\s/g, '')
              register.onChange(e)
            }}
            onKeyDown={(e) => {
              if (e.key === ' ') {
                e.preventDefault()
              }
            }}
            placeholder={placeholder}
          />
        )
      case 'textarea':
        return (
          <textarea
            className={`${baseClass} `}
            rows={rows}
            maxLength={maxLength}
            {...register}
            value={value ?? register?.value}
            onChange={(e) => {
              register?.onChange(e)
              if (onChange) onChange(e)
            }}
            placeholder={placeholder}
          />
        )
      case 'passCode':
        return (
          <OtpInput
            value={value as string}
            onChange={(val: any) => {
              if (onChange) onChange(val)
            }}
            numInputs={codeLength}
            inputType='tel'
            inputStyle={`${baseClass} text-xl p-2 w flex-grow`}
            containerStyle={'flex justify-around gap-2 '}
            renderInput={(props: any) => <input {...props} />}
          />
        )
      case 'color':
        return (
          <div className='flex relative gap-2 group w-full'>
            <span className='group-focus:text-secondary absolute left-2 top-1/2 transform -translate-y-1/2'>
              <HashIcon size={15} />
            </span>
            <input
              className={`${baseClass} pl-6`}
              value={String(value)?.replace(/#/g, '') as string}
              onChange={(e) => {
                const thisValue = e.target.value
                  .toUpperCase()
                  .replace(/\s/g, '')
                  .replace(/#/g, '')
                onChange(thisValue)
              }}
            />
            <button
              type='button'
              onClick={() => setShowDropdown(!showDropdown)}
              className='p-2 rounded-md focus:border-secondary'
              style={{
                backgroundColor: `#${value}`,
                color: 'white',
              }}
            >
              <PaintbrushIcon size={20} />
            </button>
            <div
              className={`p-0 absolute top-12 z-[1210] ${
                !showDropdown ? 'hidden' : ''
              }`}
              ref={colorPickerRef}
            >
              <SketchPicker
                disableAlpha
                presetColors={[]}
                color={`#${String(value)?.replace(/#/g, '')}` as string}
                onChange={({ hex }: { hex: string }) => {
                  onChange(hex.toUpperCase().replace('#', ''))
                }}
              />
            </div>
          </div>
        )
      case 'password':
        return (
          <div className='relative w-full'>
            <input
              disabled={disabled}
              type={showPassword ? 'text' : 'password'}
              className={`${baseClass} `}
              {...register}
              value={value ?? register?.value}
              onChange={(e) => {
                e.target.value = e.target.value.replace(/\s/g, '')
                register.onChange(e)
              }}
              onKeyDown={(e) => {
                if (e.key === ' ') {
                  e.preventDefault()
                }
              }}
              placeholder={placeholder || '●●●●●●'}
            />
            {allowShowPassword && (
              <div className='absolute right-0 inset-y-0 flex gap-2 h-full items-center '>
                <button
                  type='button'
                  aria-label={showPassword ? 'Hide Password' : 'Show Password'}
                  // className='absolute inset-y-0 right-0 p-2 text-nevada'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOffIcon size={20} />
                  ) : (
                    <EyeIcon size={20} />
                  )}
                </button>
                <Divider className='h-4' orientation='vertical' />
                {endContent}
              </div>
            )}
          </div>
        )
      case 'select':
        return (
          <Select
            aria-label={(label as string) || 'select field'}
            disabledKeys={disabledKeys}
            selectedKeys={selectFieldValue}
            defaultSelectedKeys={defaultValue ? [defaultValue] : ['']}
            endContent={<>{endContent}</>}
            classNames={{
              trigger: `${baseClass} relative shadow-none rounded-r-lg p-1`,
              value: '!text-nevada ',
              selectorIcon: 'transform top-1/2 -translate-y-1/2',
              // listboxWrapper: 'max-h-[400px]',
            }}
            onSelectionChange={(value) => {
              onChange(value)
              setSelectFieldValue(value)
              const array = Array.from(value)
              onChange(array[0])
            }}
            disabled={disabled}
          >
            {placeholder &&
              ((<SelectItem key={''}>{placeholder}</SelectItem>) as any)}
            {(options as any)?.map((option: any) => (
              <SelectItem
                key={option?.value}
                classNames={{ title: option?.className || '' }}
                endContent={option?.endContent}
              >
                {option?.label}
              </SelectItem>
            ))}
          </Select>
        )
      case 'autocomplete':
        return (
          <Autocomplete
            aria-label={(label as string) || 'select  field'}
            placeholder={placeholder}
            defaultSelectedKeys={defaultValue ? [defaultValue] : ['']}
            inputProps={{
              classNames: {
                inputWrapper: `${baseClass} border-none !py-1 relative shadow-none !text-nevada !rounded-r-lg`,
                input: '!text-nevada',
              },
            }}
            classNames={{
              selectorButton: '!text-nevada',
            }}
            selectedKey={value as string}
            onSelectionChange={(value) => {
              onChange(value)
            }}
            disabled={disabled}
            endContent={endContent}
          >
            {/* eslint-disable-next-line */}
            {/* @ts-ignore */}
            {options?.map((option) => (
              <AutocompleteItem
                key={option?.value}
                variant='solid'
                classNames={{
                  wrapper: 'group',
                }}
              >
                <>{option?.label}</>
              </AutocompleteItem>
            ))}
          </Autocomplete>
        )
      case 'checkbox':
        return (
          <Checkbox
            defaultSelected={defaultChecked}
            className='p-0 ml-0'
            disabled={disabled}
            color='secondary'
            size='sm'
            radius={'none'}
            isSelected={Boolean(value)}
            onValueChange={!disabled ? onChange : undefined}
            classNames={{ icon: 'text-white' }}
          />
        )
      case 'switch':
        return (
          <Switch
            startContent={
              showSwitchIcon &&
              ((
                <CheckIcon color='white' size={switchSize == 'sm' ? 10 : 12} />
              ) as any)
            }
            endContent={
              showSwitchIcon &&
              ((<XIcon size={switchSize == 'sm' ? 10 : 12} />) as any)
            }
            size={switchSize}
            color='secondary'
            defaultSelected={defaultChecked}
            className='p-0'
            classNames={{
              wrapper: `${
                switchSize == 'sm' ? 'w-9 h-[1.2rem]' : ''
              }  m-0 px-0`,
              thumb: `${
                switchSize == 'sm'
                  ? 'group-data-[selected=true]:ms-[1.1rem] !size-[1.1rem]'
                  : 'group-data-[selected=true]:ms-[1.3rem] !size-[1.65rem]'
              } `,
            }}
            isDisabled={disabled}
            isSelected={Boolean(value)}
            onValueChange={onChange}
          />
        )
      case 'radio':
        return (
          <input
            disabled={disabled}
            type='radio'
            name='inventory'
            id='out-stock'
            className='w-4 h-4 accent-black'
            value={value}
            defaultChecked={defaultChecked}
            {...register}
            onChange={onChange}
          />
        )
      case 'number':
        return (
          <input
            disabled={disabled}
            type='number'
            min={min}
            className={`${baseClass} `}
            {...register}
            onChange={(e) => {
              const newValue = e.target.value
              const parsedValue = parseFloat(newValue)
              if (!isNaN(parsedValue)) {
                register?.onChange({
                  target: {
                    value: parsedValue,
                  },
                })
                if (onChange) onChange(e)
              }
            }}
            value={register?.value ?? value}
            defaultValue={register?.defaultValue ?? defaultValue}
            placeholder={placeholder}
          />
        )
      case 'phoneNumber':
        return (
          <input
            placeholder={placeholder}
            disabled={disabled}
            type={'tel'}
            maxLength={14}
            {...register}
            className={`${baseClass} `}
            onChange={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, '')
              if (register && register.onChange) {
                register.onChange(e)
              }
              if (onChange) {
                onChange(e)
              }
            }}
          />
        )
      case 'amount':
        return (
          <input
            disabled={disabled}
            type='tel'
            min={min}
            className={`${baseClass}`}
            placeholder={placeholder}
            value={amountValue as string}
            onChange={(e) => {
              const rawValue = e.target.value
              // Notify parent component with the numeric value
              if (onChange) {
                const numericValue =
                  parseFloat(rawValue.replace(/[^\d.]/g, '')) || 0
                onChange(numericValue)
              }
            }}
            defaultValue={defaultValue}
          />
        )
      case 'weight':
        return (
          <div className='flex rounded-sm border border-gray-300'>
            <input
              disabled={disabled}
              type='number'
              min={min}
              className={`${baseClass} pl-12 `}
              placeholder={placeholder}
              {...register}
            />
            <p className='px-4 py-2 text-nevada bg-gray-100 border-r'>kg</p>
          </div>
        )
      case 'image':
        return (
          <div className=''>
            <input
              disabled={disabled}
              type='file'
              accept='.jpg, .jpeg, .png'
              className={`hidden`}
              {...register}
              onChange={(e) => {
                onChange(e)
                register.onChange(e)
              }}
            />
          </div>
        )
      case 'file':
        return (
          <>
            <input
              disabled={disabled}
              type='file'
              accept='.jpg, .jpeg, .png'
              className={`hidden`}
              {...register}
              onChange={(e) => {
                onChange(e)
                register?.onChange ? register.onChange(e) : null
                setFileName(e.target.files?.[0]?.name || 'No File Chosen')
              }}
            />
            <div
              tabIndex={-1}
              aria-label='input file'
              className={`${baseClass} flex w-full gap-4`}
            >
              <span className='border-r pr-3'>
                <FileIcon />
              </span>
              <span className='flex-grow'>{fileName}</span>
            </div>
          </>
        )
      case 'postal-code':
        return (
          <input
            disabled={disabled}
            type='text'
            className={`text-gray-700 p-2 w-full rounded-sm border border-gray-300 ${
              !!errorMessage ? 'border-red-400' : 'focus:border-green-500'
            }`}
            {...register}
            value={value ?? register?.value}
            defaultValue={defaultValue ?? register?.defaultValue}
            maxLength={10}
            onChange={(e) => {
              const newValue = e.target.value.replace(/\D/g, '')
              register?.onChange({
                target: {
                  value: newValue,
                },
              })
              if (onChange) onChange(newValue)
            }}
            placeholder={placeholder}
            autoComplete={autoComplete}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className={`space-y-1  ${className} `}>
      <label
        className={twMerge(
          'relative text-sm font-medium text-nevada font-oxygen',
          type === 'radio' ||
            type === 'checkbox' ||
            type === 'switch' ||
            renderLabelRight ||
            renderLabelLeft
            ? 'flex items-center gap-1 space-y-0'
            : 'space-y-1',
          classNames.base,
          disabled && 'cursor-not-allowed'
        )}
      >
        {type == 'radio' ||
        type == 'checkbox' ||
        type == 'switch' ||
        renderLabelRight
          ? label && (
              <p className={twMerge(`order-2`, classNames.label)}>
                {label} {isRequired && <span className='text-red-700'>*</span>}
              </p>
            )
          : renderLabelLeft
          ? label && (
              <p className={twMerge(`order-1`, classNames.label)}>
                {label} {isRequired && <span className='text-red-700'>*</span>}
              </p>
            )
          : label && (
              <p>
                <span className={twMerge(classNames.label)}>{label}</span>
                {isRequired && <span className='text-red-700'>*</span>}
              </p>
            )}
        <div className={`relative ${type !== 'passCode' ? 'flex' : ''}`}>
          {startContent && (
            <div className='bg-background grid place-items-center p-2.5 rounded-l-lg border border-r-0 text-nevada'>
              {startContent}
            </div>
          )}
          {renderInput()}
          {endContent && type != 'password' && (
            <div className='absolute right-0 flex gap-2 h-full items-center'>
              <Divider className='h-4' orientation='vertical' />
              {endContent}
            </div>
          )}
        </div>
      </label>
      {errorMessage && (
        <p className='pl-1 text-sm text-red-400'>{errorMessage}</p>
      )}
    </div>
  )
}

export default InputField

interface RadioCardProps {
  label: string
  descriptionProp?: string
  errorMessage?: string
  value: string
}

export const RadioCard: FC<RadioCardProps> = ({
  descriptionProp,
  label,
  value,
}) => {
  const {
    Component,
    description,
    getBaseProps,
    getWrapperProps,
    getInputProps,
    getLabelProps,
    getLabelWrapperProps,
    getControlProps,
  } = useRadio({ description: descriptionProp as any, value })
  return (
    <Component
      {...getBaseProps()}
      className={cn(
        'group inline-flex items-center hover:opacity-70 active:opacity-50 justify-between flex-row-reverse tap-highlight-transparent',
        'cursor-pointer border-[1px] border-default rounded-lg gap-4 p-2 py-2.5',
        'data-[selected=true]:border-secondary '
      )}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <span {...getWrapperProps()}>
        <span {...getControlProps()} />
      </span>
      <div {...getLabelWrapperProps()}>
        {label && (
          <span
            {...getLabelProps()}
            className='font-oxygen font-semibold !text-nevada/70 text-sm'
          >
            {label}
          </span>
        )}
        {description && (
          <span className='text-small text-foreground opacity-70'>
            {description}
          </span>
        )}
      </div>
    </Component>
  )
}
