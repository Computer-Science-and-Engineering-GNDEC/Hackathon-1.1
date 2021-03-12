package com.example.onlineexam;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.Toast;

public class Teachers extends AppCompatActivity {

    WebView webb;
    Button btnportal;
    String bb = "https://admin.speedexam.net/Default.aspx";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_teachers);

        webb = findViewById(R.id.webb);
        webb.getSettings().setJavaScriptEnabled(true);


        webb.getSettings().getJavaScriptEnabled();

        btnportal = findViewById(R.id.btnportal);
        webb.setWebViewClient(new WebViewClient());
        webb.getSettings().getJavaScriptEnabled();


        btnportal.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(v==btnportal)
                {
                    webb.loadUrl(bb);
                    Toast.makeText(Teachers.this, "Wait for 2 second", Toast.LENGTH_SHORT).show();
                }
            }
        });



    }
}