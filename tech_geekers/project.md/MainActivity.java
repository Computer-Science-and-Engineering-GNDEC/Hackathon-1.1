package com.example.onlineexam;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;
import androidx.cardview.widget.CardView;

import android.bluetooth.BluetoothAdapter;
import android.content.Intent;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.net.wifi.WifiManager;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.google.android.gms.auth.api.signin.GoogleSignInClient;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.android.gms.common.SignInButton;
import com.google.android.gms.common.api.ApiException;
import com.google.android.gms.tasks.Task;
import com.google.android.material.snackbar.Snackbar;


public class MainActivity extends AppCompatActivity implements View.OnClickListener {





    SignInButton google;
    GoogleSignInClient mGoogleSignInClient;
    int RC_SIGN_IN = 0;

    Button web,wifi,gee;
    Button btnn,block;
    BluetoothAdapter ba;
    CardView addGroup,addUpload;





    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);


        addGroup = findViewById(R.id.addGroup);
        addUpload = findViewById(R.id.addUpload);
        gee = findViewById(R.id.gee);

        block = findViewById(R.id.block);
        addGroup.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
Intent intent6 = new Intent(MainActivity.this,Teachers.class);
startActivity(intent6);
            }
        });
        getSupportActionBar().setDisplayShowHomeEnabled(true);
        getSupportActionBar().setIcon(R.drawable.geekers);
        getSupportActionBar().setTitle("Tech_Geekers");


        ba = BluetoothAdapter.getDefaultAdapter();

        ConnectivityManager cm;

        getSupportActionBar().setDisplayHomeAsUpEnabled(true);

        block.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent45 = new Intent(MainActivity.this,block_notification.class);
                startActivity(intent45);
            }
        });

        gee.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

Intent intent2222 = new Intent(MainActivity.this,ThirdActivity.class);
startActivity(intent2222);

            }
        });




addUpload.setOnClickListener(new View.OnClickListener() {
    @Override
    public void onClick(View v) {
Intent intent11 = new Intent(MainActivity.this,cameraclick.class);
startActivity(intent11);
    }
});


        web = findViewById(R.id.web);
        btnn = findViewById(R.id.btnn);

        cm= (ConnectivityManager) getSystemService(CONNECTIVITY_SERVICE);

        wifi =findViewById(R.id.wifi);
        wifi.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

              NetworkInfo ni  =   cm.getActiveNetworkInfo();
              if(ni!=null&&ni.isConnected()&&ni.isAvailable()){
                  Snackbar.make(v,"internet is connected",Snackbar.LENGTH_LONG).show();



              }
              else
                  Snackbar.make(v,"internet is off (turn it On)",Snackbar.LENGTH_LONG).show();

            }
        });






        btnn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(v==btnn){
                    if(ba.isEnabled())
                        Toast.makeText(MainActivity.this, "Bluetooth is On (Turn It Off)", Toast.LENGTH_SHORT).show();
                    else
                        Toast.makeText(MainActivity.this, "Bluetooth is Off (GOOD)", Toast.LENGTH_SHORT).show();
                }

            }
        });

        google = findViewById(R.id.google);

        google.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                switch (v.getId()) {
                    case R.id.google:
                        signIn();
                        break;
                }
            }
        });

        web.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intentt = new Intent(MainActivity.this,webpage.class);
                startActivity(intentt);
            }
        });




        GoogleSignInOptions gso = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                .requestEmail()
                .build();

        mGoogleSignInClient = GoogleSignIn.getClient(this, gso);
    }


        private void signIn() {
            Intent signInIntent = mGoogleSignInClient.getSignInIntent();
            startActivityForResult(signInIntent, RC_SIGN_IN);
        }
    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        // Result returned from launching the Intent from GoogleSignInClient.getSignInIntent(...);
        if (requestCode == RC_SIGN_IN) {
            // The Task returned from this call is always completed, no need to attach
            // a listener.
            Task<GoogleSignInAccount> task = GoogleSignIn.getSignedInAccountFromIntent(data);
            handleSignInResult(task);
        }
    }

    private void handleSignInResult(Task<GoogleSignInAccount> completedTask) {
        try {
            GoogleSignInAccount account = completedTask.getResult(ApiException.class);

            // Signed in successfully, show authenticated UI.

            Intent intent = new Intent(MainActivity.this,SecondActivity.class);

            startActivity(intent);
        } catch (ApiException e) {
            // The ApiException status code indicates the detailed failure reason.
            // Please refer to the GoogleSignInStatusCodes class reference for more information.

            Log.w( "Error", "signInResult:failed code=" + e.getStatusCode());

        }
    }

    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {
        if(item.getItemId()==android.R.id.home)
            onBackPressed();
        return super.onOptionsItemSelected(item);


    }




    @Override
    public void onClick(View v) {

    }
}
