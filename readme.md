# hyperarchiver-auth

Experimental [hyperarchiver](https://github.com/joehand/hyperarchiver) auth site thingy.

## Test it out!!

You'll add a Dat to the hyperarchiver and then you can visit it on the lines!

0. Install it: `git clone link_up_there ^` && `npm link`.
1. Run the server: `npm start` (keep this window open & running)
2. Register a user: `hyperarchiver-auth register`
3. Add a Dat: `hyperarchiver-auth add --key 002fcbb034a3a9990e3877d08e8bf2fdfb9fc1ced498948be94577fc82336c9e`
4. View the metadata: http://127.0.0.1:3322/archives/002fcbb034a3a9990e3877d08e8bf2fdfb9fc1ced498948be94577fc82336c9e/
5. View a file. http://127.0.0.1:3322/archives/002fcbb034a3a9990e3877d08e8bf2fdfb9fc1ced498948be94577fc82336c9e/modules/dat.md

It may take a moment to be available until the archive is fully backed up. You'll see a message on the server when the archive is completed.

The archive is now available over HTTP and over Dat!

## TODO

* Drink more coffee

## License
