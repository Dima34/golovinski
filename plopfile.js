export default function (plop) {
  /*
  SECTION
   */
  plop.setGenerator('section', {
    description: 'Create a new section files: blade view, style, composer',
    prompts: [
      {
        'message': 'What is the name of the section?',
        'type': 'input',
        'name': 'name',
      },
      {
        'message': 'Should this section have a style file?',
        'type': 'confirm',
        'name': 'style',
        'default': true,
      },
      {
        'message': 'Should this section have a composer file?',
        'type': 'confirm',
        'name': 'composer',
        'default': false,
      },
    ], // array of inquirer prompts
    actions: function (data) {
      const actions = [
        {
          type: 'add',
          templateFile: 'plop_templates/view.section.handlebars',
          path: './resources/views/sections/{{dashCase name}}.blade.php',
          data: {
            'className': 'section-' + data.name,
            'title': data.name,
          },
        },
      ];

      // Styles
      if (data.style) {
        const styleActions = createActionsStyleCreateAppend('sections', data.name);
        actions.push(...styleActions);
      }

      // Composer
      if (data.composer) {
        actions.push({
          type: 'add',
          templateFile: 'plop_templates/view.composer.php.handlebars',
          path: './app/View/Composers/{{pascalCase name}}.php',
          data: {
            'name': '{{pascalCase name}}',
          },
        });
      }
      return actions;
    },
  });

  /*
  COMPONENT
   */
  plop.setGenerator('component', {
    description: 'Create a new component files: blade view, style',
    prompts: [
      {
        'message': 'What is the name of the component?',
        'type': 'input',
        'name': 'name',
      },
      {
        'message': 'Should this component have a style file?',
        'type': 'confirm',
        'name': 'style',
        'default': true,
      },
    ],
    actions: function (data) {
      const actions = [
        {
          type: 'add',
          template: '',
          path: './resources/views/components/{{dashCase name}}.blade.php',

        }];
      // Styles
      if (data.style) {
        const styleActions = createActionsStyleCreateAppend('components', data.name);
        actions.push(...styleActions);
      }
      return actions;

    },
  });

  /*
  BLOCK
   */
  plop.setGenerator('block', {
    description: 'Create a new block files: view, style, field',
    prompts: [
      {
        'message': 'What is the name of the block?',
        'type': 'input',
        'name': 'name',
      },
      {
        'message': 'Should this block have a style file?',
        'type': 'confirm',
        'name': 'style',
        'default': true,
      },
      {
        'message': 'Should this block have a field file?',
        'type': 'confirm',
        'name': 'field',
        'default': true,
      },
      {
        message: 'Block category',
        type: 'list',
        name: 'category',
        choices: [
          'Common',
          'Project Sections',
        ],
        when: function (answers) {
          return answers.field === true;
        },

      },

    ],
    actions: function (data) {
      const actions = [
        {
          type: 'add',
          template: '',
          path: './resources/views/blocks/{{dashCase name}}.blade.php',
        }];
      // Styles
      if (data.style) {
        const styleActions = createActionsStyleCreateAppend('blocks', data.name, 'block');
        actions.push(...styleActions);
      }
      if (data.field) {
        actions.push({
          type: 'add',
          templateFile: 'plop_templates/field.block.handlebars',
          path: './app/Fields/{{pascalCase name}}.php',
          data: {
            'blockName': data.name,
            'categoryName': data.category,
          },
        });
      }
      return actions;
    },
  });
}

function createActionsStyleCreateAppend(type, name, classPrefix = '') {
  const lCaseType = type.toLowerCase();
  const uCaseType = type.toUpperCase();
  const stylePath = './resources/styles/' + lCaseType + '/_{{dashCase name}}.scss';
  const importDirectiveTemplate = "@import './" + lCaseType + "/{{dashCase name}}';";
  const mainStylePath = './resources/styles/app.scss';
  return [
    {
      type: 'add',
      templateFile: 'plop_templates/style.scss.handlebars',
      path: stylePath,
      data: {
        'className': classPrefix ? classPrefix + '-' + name : name,
      },
    },
    {
      type: 'append',
      template: importDirectiveTemplate,
      pattern: new RegExp(`(//${uCaseType})`, 'g'),
      path: mainStylePath,
      unique: true,
      data: {
        'fileName': name,
      },
    },
  ];
}
