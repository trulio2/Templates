import { type ITranslations } from '@/types'

export const pt: ITranslations = {
  pages: {
    home: {
      welcome: 'Bem-vindo',
      greeting: 'Olá, {name}!',
      pleaseLogin: 'Por favor, faça login para continuar.'
    },
    login: {
      title: 'Login',
      username: 'Usuário',
      password: 'Senha',
      enterUsername: 'Digite o usuário',
      enterPassword: 'Digite a senha',
      usernameRequired: 'Usuário é obrigatório',
      passwordRequired: 'Senha é obrigatória',
      invalidCredentials: 'Credenciais inválidas',
      submit: 'Entrar'
    },
    cats: {
      title: 'Gatos',
      hasCats: '{name} tem {count} gatos',
      addCat: 'Adicionar Gato',
      removeCat: 'Remover Gato'
    },
    admin: {
      title: 'Admin',
      userName: 'Nome do usuário é {name}',
      count: 'Contagem {count}'
    },
    notFound: {
      title: 'Página Não Encontrada',
      message: 'A página que você está procurando não existe.',
      goBack: 'Ir para Início'
    }
  },
  nav: {
    home: 'Início',
    cats: 'Gatos',
    admin: 'Admin',
    login: 'Login',
    logout: 'Sair'
  },
  theme: {
    light: 'Claro',
    dark: 'Escuro'
  }
}
