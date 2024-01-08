export const Text = {
  recipient_id: 'nikita',
  text: "The company FEIN is important since this is how you will file your taxes.Please enter it again to make sure it's correct.",
};

export const PlainButtons = {
  recipient_id: 'nikita',
  custom: {
    type: 'plainButton',
    data: [
      {
        key: 'YES',
        value: 'yes',
      },
      {
        key: 'NO',
        value: 'no',
      },
    ],
  },
};

export const ActionButton = {
  recipient_id: 'nikita',
  custom: {
    type: 'actionButton',
    data: {
      title: 'Please select your account type',
      description:
        'Save your prefrence for specific query and move to next step.',
      payload: [
        {
          key: 'BUSINESS',
          value: 'Business',
        },
        {
          key: 'INDIVIDUAL',
          value: 'Individual',
        },
      ],
    },
  },
};

export const SimpleInfoBox = {
  recipient_id: 'nikita',
  custom: {
    type: 'simpleInfoBox',
    title: 'company setup',
    data: [
      {
        title: 'Help is just a tap away',
        description:
          'Access live support 24/7 by tapping Help at the top of your screen.',
      },
      {
        title: 'Mistakes are fixable',
        description:
          'If you enter something incorrectly,you can make changes by tapping the',
      },
      {
        title: 'Help is just a tap away',
        description:
          'Access live support 24/7 by tapping Help at the top of your screen.',
      },
    ],
  },
};

export const TextInfoBox = {
  recipient_id: 'nikita',
  custom: {
    type: 'textInfoBox',
    data: [
      {
        title: 'Help is just a tap away',
        description:
          'Access live support 24/7 by tapping Help at the top of your screen.',
      },
      {
        title: 'Mistakes are fixable',
        description:
          'If you enter something incorrectly,you can make changes by tapping the',
      },
      {
        title: 'Help is just a tap away',
        description:
          'Access live support 24/7 by tapping Help at the top of your screen.',
      },
    ],
  },
};

export const KeyValueInfoBox = {
  recipient_id: 'nikita',
  custom: {
    type: 'keyValueInfoBox',
    title: 'company setup',
    data: [
      {
        key: 'Bank name',
        value: 'Chase',
      },
      {
        key: 'Account type',
        value: 'Checking account',
      },
      {
        key: 'Routing number',
        value: '123455678',
      },
      {
        key: 'Account number',
        value: '123455678',
      },
    ],
  },
};

export const AccordionInfoBox = {
  recipient_id: 'nikita',
  custom: {
    type: 'accordionInfoBox',
    title: 'company setup',
    data: [
      {
        accordianName: 'Albert Johnes',
        data: [
          {
            key: 'Bank name',
            value: 'Chase',
          },
          {
            key: 'Account type',
            value: 'Checking account',
          },
          {
            key: 'Routing number',
            value: '123455678',
          },
          {
            key: 'Account number',
            value: '123455678',
          },
        ],
      },
    ],
  },
};

export const Dropdown = {
  recipient_id: 'nikita',
  custom: {
    type: 'dropDown',
    title: 'What type of business it is',
    buttonText: 'Save',
    data: [
      {
        label: 'Agriculture',
        value: 'Agriculture',
      },
      {
        label: 'Construction & Engineering',
        value: 'construction & Engineering',
      },
      {
        label: 'Fanancial',
        value: 'Financial',
      },
    ],
  },
};

export const StepsComplete = {
  recipient_id: 'nikita',
  custom: {
    type: 'stepsComplete',
    text: 'Nice work, step 1 of 5 completed',
    totalSteps: 5,
    completeSteps: 2,
  },
};

export const FormAction = {
  recipient_id: 'maish',
  custom: {
    type: 'formaction',
    data: [
      {
        label: 'emptype',
        inputType: 'dropdown',
        data: [
          {
            key: '1099 individual contractor',
            value: '1099 individual contractor',
          },
          {
            key: '1099 Business contractor',
            value: '1099 Business contractor',
          },
        ],
      },
      {
        label: 'firstName',
        inputType: 'text',
        data: '',
      },
      {
        label: 'middlename',
        inputType: 'text',
        data: '',
      },
      {
        label: 'lastName',
        inputType: 'text',
        data: '',
      },
      {
        label: 'email',
        inputType: 'text',
        data: '',
      },
      {
        label: 'ssn',
        inputType: 'text',
        data: '',
      },
      {
        label: 'location',
        inputType: 'text',
        data: '',
      },
      {
        label: 'mobile_number',
        inputType: 'text',
        data: '',
      },
      {
        label: 'Apt',
        inputType: 'text',
        data: '',
      },
      {
        label: 'gender',
        inputType: 'radio',
        data: [
          {
            key: 'MALE',
            value: 'Male',
          },
          {
            key: 'FEMALE',
            value: 'Female',
          },
          {
            key: 'OTHER',
            value: 'Other',
          },
        ],
      },
      {
        label: 'address',
        inputType: 'text',
        data: '',
      },
    ],
  },
};

// how to identify which field need to keep half
