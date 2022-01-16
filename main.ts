import { CommandClient, slash, event, ApplicationCommandInteraction, ApplicationCommandOptionType, GatewayIntents } from './deps.ts'

class RemindBot extends CommandClient {
  constructor() {
    super({
      prefix: ['/'],
      caseSensitive: false,
    })
  }

  @event()
  async ready(): Promise<void> {
    this.interactions.commands.bulkEdit([
      {
        name: 'remind',
        description: "Set your reminder",
        options: [
          {
            name: 'MESSAGE_AND_SCHEDULE',
            description: 'The messsage to remind.',
            required: true,
            type: ApplicationCommandOptionType.STRING
          },
        ]
      },
    ]);
    console.log(`Logged in as ${this.user?.tag}!`)
  }

  @slash()
  remind(interaction: ApplicationCommandInteraction): void {
    const message = interaction.option<string>("MESSAGE_AND_SCHEDULE");
    interaction.reply(`It will process ${message}`);
  }
}

const TOKEN = Deno.env.get("TOKEN");
if (TOKEN === undefined) {
  console.error("Set 'TOKEN' environment variable.");
  Deno.exit(-1);
}

new RemindBot().connect(TOKEN, [GatewayIntents.GUILDS])
