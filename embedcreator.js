const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField} = require("discord.js");
 
module.exports = {
    data: new SlashCommandBuilder()
    .setName("embedcreator")
    .setDescription("soon")
    .addStringOption(option => option
        .setName("title")
        .setDescription("soon")
        .setRequired(true)
    )
    .addStringOption(option => option
        .setName("description")
        .setDescription("soon")
        .setRequired(true)
    )
    .addStringOption(option => option
        .setName("color")
        .setDescription("soon")
        .setRequired(true)
        .addChoices(
            {name: "aqua", value: "#00FFFF"},
            {name: "blurple", value: "#7289DA"},
            {name: "fuchsia", value: "#FF00FF"},
            {name: "gold", value: "#FFD700"},
            {name: "green", value: "#008000"},
            {name: "grey", value: "#808080"},
            {name: "greyple", value: "#7D7F9A"},
            {name: "light-grey", value: "#D3D3D3"},
            {name: "luminos-vivid-pink", value: "#FF007F"},
            {name: "navy", value: "#000080"},
            {name: "not-quite-black", value: "#232323"},
            {name: "orange", value: "#FFA500"},
            {name: "purple", value: "#800080"},
            {name: "red", value: "#FF0000"},
            {name: "white", value: "#FFFFFF"},
            {name: "yellow", value: "#FFFF00"},
            {name: "blue", value: "#0000FF"}
        )
    )
    .addChannelOption(option => option
        .setName("channel")
        .setDescription("soon")
        .setRequired(false)
    ),
 
    async execute (interaction, client) {
        const Color = interaction.options.getString("color");
        const Title = interaction.options.getString("title");
        const Desc = interaction.options.getString("description");
        const Channel = interaction.options.getChannel("channel") || interaction.channel;
        const CID  = Channel.id;
 
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return interaction.reply("soon");
 
        const embed = new EmbedBuilder()
        .setColor(`${Color}`)
        .setTitle(`${Title}`)
        .setDescription(`${Desc}`)

 
        const channel = client.channels.cache.get(`${CID}`);
 
        channel.send({
            embeds: [embed]
        }).catch(err => {
            return;
        });
 
        await interaction.reply({ content: `Embed został wysłany do: <#${CID}>!`, ephemeral: true })
 
 
    }
}